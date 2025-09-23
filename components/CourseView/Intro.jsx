import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import { imageAssets } from '../../constant/Option';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constant/Colors';
import Button from './../../components/Shared/Button';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { UserDetailContext } from './../../context/UserDetailContext';
import { db } from './../../config/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
export default function CourseView({course, enroll}) {
     
    const router = useRouter();
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);

    // if(userDetail?.member == false){
    //       router.push('/subscriptionWall')
    //       return;
    //     }

    const onEnrollCourse = async() => {
      const docId = Date.now().toString();
      setLoading(true);
      const data = {
        ...course,
        createdBy: userDetail?.email,
        createOn: new Date(),
        enrolled : true
      }
      await setDoc(doc(db, 'Courses', docId), data);
      router.push({
        pathname: '/courseView/' + docId,
        params: {
            courseParams: JSON.stringify(data),
            enroll: false,
            }
    });
        setLoading(false);
    }

    return (
        <View >
            
             <Image source={imageAssets[course?.banner_image]} style={{
               width: '100%',
                height: 200,

              
           }} />
           <View style={{
             padding: 20,
           }}>
             <Text style={{
                fontSize: 25,
                fontFamily: 'outfit-bold',
             }}>
                {course?.courseTitle}
             </Text>

              <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                            marginTop: 5,
                            alignItems: 'center',
                            }}>
                            <Ionicons name="book-outline" size={20} color="black" />
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 18,
                        }}
                        >
                            
                            {course?.chapters?.length} Chapters</Text>
                    </View>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    marginTop: 10,
                    fontSize: 20,
                }}>
                    Description:
                </Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 18,
                    color: Colors.GRAY
                }}>{course?.description}</Text>
                {enroll=='true'?<Button text="Enroll Now"
                loading={loading}

                onPress={() => onEnrollCourse()}
                
                />:
              <Button text={'Start Now'}
              onPress={() => console.log('')}
              />}
           </View>
           <Pressable style={{
                position: 'absolute',
                padding: 10,
            }}
            onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={34} color="black" />
            </Pressable>
    </View>
    );
}
