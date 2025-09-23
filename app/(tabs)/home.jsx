import{View, Text, Platform, Image} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import  Header  from '../../components/Home/Header';
import Colors from './../../constant/Colors';
import NoCourse from '../../components/Home/NoCourse';
import {db} from './../../config/firebaseConfig';
import {collection, query, getDocs, where} from 'firebase/firestore';
import {UserDetailContext} from './../../context/UserDetailContext';
import CourseList from './../../components/Home/CourseList';
import CourseProgress from './../../components/Home/CourseProgress';
import PracticeSection from '../../components/Home/PracticeSection';
import { orderBy } from 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
export default function Home() {

   const [courseList, setCourseList] = useState([]);
   const {userDetail, setUserDetail} = useContext(UserDetailContext);
   const [loading, setLoading] = useState(false);
   const [initialLoading, setInitialLoading] = useState(true);

   useEffect(() => {
    if (userDetail) GetCourseList();
   }, [userDetail]);

    const GetCourseList = async () => {
        setLoading(true);
        setCourseList([]);
        const q = query(collection(db, 'Courses'), where('createdBy', '==', (userDetail?.email )), orderBy('createdOn', 'desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
           // console.log("--", doc.data());
            setCourseList(prev => [...prev, doc.data()]);
        });
        setLoading(false);
    }
    return (
        <FlatList
        data={[]}
        onRefresh={() => GetCourseList()}
        refreshing={loading}
        ListHeaderComponent={
            <View style={{
                //  flex: 1,
                //   backgroundColor: Colors.WHITE,
            }}>
            <Image source={require('./../../assets/images/wave.png')}
            style={{
                position: 'absolute',
                width: '100%',
                height: 500,
            }}
            />
        <View style={{
            padding: 25,
            paddingTop: Platform.OS == 'ios' && 45
        }}>
           <Header />
           {courseList?.length == 0 ?
           <NoCourse />: 
           <View>
            <CourseProgress  courseList={courseList} />
            <PracticeSection />
           <CourseList courseList={courseList} />
              </View>
        
           }

        </View>
        </View>
        }/>
    )
}