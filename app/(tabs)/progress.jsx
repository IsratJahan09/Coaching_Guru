import { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View} from 'react-native';

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import CourseProgressCard from '../../components/Shared/CourseProgressCard';
import { db } from './../../config/firebaseConfig';
import Colors from './../../constant/Colors';
import { UserDetailContext } from './../../context/UserDetailContext';
import Button from './../../components/Shared/Button';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';

export default function Progress() {
   const [courseList, setCourseList] = useState([]);
   const {userDetail, setUserDetail} = useContext(UserDetailContext);
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   useEffect(() => {
    userDetail && GetCourseList();
   }, [userDetail]);

    const GetCourseList = async () => {
        setLoading(true);
        setCourseList([]);
        const q = query(collection(db, 'Courses'), where('createdBy', '==', (userDetail?.email ), ), orderBy('createdOn', 'desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
           // console.log("--", doc.data());
            setCourseList(prev => [...prev, doc.data()]);
        });
        setLoading(false);
    }
    
    return (
        <View>
           <Image source={require('./../../assets/images/wave.png')}
                style={{
                    position: 'absolute',
                    width: '100%',
                }}
           />
           
           <View style={{
            width: '100%',
            position: 'absolute',
            padding: 20,
           }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
                color: Colors.WHITE,
                marginBottom: 10,
                marginBlock: 10,
            }}>Course Progress</Text>

            {courseList.length > 0 ? (
                <FlatList
                data={courseList}
                showsVerticalScrollIndicator={false}
                onRefresh={() => GetCourseList()}
                refreshing={loading}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={()=>router.push({
                            pathname: '/courseView/'+item?.docId,
                            params: {
                                courseParams: JSON.stringify(item),
                             }
                        })}>
                      <CourseProgressCard item={item} width={'94%'}/>
                    </TouchableOpacity>
                )}
                />
            ) : !loading && (
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 100,
                }}>
                    <FontAwesome6 name="book-open-reader" size={120} color={Colors.BLACK} style={{
                        marginBottom: 13,
                        marginTop: 110,
                    }}  />
                     <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 25,
                        textAlign: 'center' }}
                        >You Don&apos;t Have Any Courses Yet</Text>
                        <Button text={'+ Create New Course'} onPress={() => router.push('/addCourse')}/>
                </View>
            )}

           </View>
        </View>
    );
    }