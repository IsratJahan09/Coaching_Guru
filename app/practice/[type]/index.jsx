import {View, Text, Image, Pressable, } from 'react-native';
import React,{useEffect, useContext, useState} from 'react';
import { useLocalSearchParams } from 'expo-router';
import { imageAssets, PracticeOptions } from '../../../constant/Option';
import Ionicons from '@expo/vector-icons/Ionicons';  
import Colors from '../../../constant/Colors';
import { useRouter } from 'expo-router';
import { collection, query, where, getDocs, orderBy,} from 'firebase/firestore';
import { db } from './../../../config/firebaseConfig';
import { UserDetailContext } from './../../../context/UserDetailContext';
import { ActivityIndicator } from 'react-native-web';
import CourseListGrid from '../../../components/PracticeScreen/CourseListGrid';

export default function PracticeTypeHomeScreen() {
    const {type} = useLocalSearchParams();
    const router = useRouter();
    const option = PracticeOptions.find(item => item.name == type);
    console.log(option);
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);

    const [courseList, setCourseList] = useState([]);

     useEffect(() => {
        userDetail&&GetCourseList();
    }, [userDetail]);

    const GetCourseList = async () => {
        setLoading(true);
        setCourseList([]);
        try{
        const q = query(collection(db, 'Courses'),
         where('createdBy', '==', (userDetail?.email )),
        orderBy('createdOn', 'desc')
        );

         const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
               // console.log("--", doc.data());
                setCourseList(prev => [...prev, doc.data()]);
            });
        setLoading(false);
        }
        catch(e){
            console.log(e);
            setLoading(false);
        }
    }
    return(
        <View>
            <Image source={option.image} style={{
                width: "100%",
                height: 200,
            }}/>

            <View style={{
                position: 'absolute',
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}>
                <Pressable onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black"
                style={{
                    backgroundColor: Colors.WHITE,
                    padding: 8,
                    borderRadius: 10,
                }}
                />
                </Pressable>
                <Text style={{
                    fontSize: 35,
                    fontFamily: 'outfit-bold',
                    color: Colors.WHITE,
                }}>{type}</Text>
            </View>

            {loading&&<ActivityIndicator size={"large"} 
            style={{
                marginTop: 150,
            }}
            color={Colors.PRIMARY} />}

            <CourseListGrid courseList={courseList}  
            option={option}
            />

        </View>
    )
}