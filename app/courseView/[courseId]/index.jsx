import {View, Text, Image} from 'react-native';
import React  from 'react';
import { useLocalSearchParams } from 'expo-router';
import Intro from '../../../components/CourseView/Intro';
import { imageAssets } from '../../../constant/Option';
import Colors from '../../../constant/Colors';
import Chapters from '../../../components/CourseView/Chapters';
import { FlatList } from 'react-native-gesture-handler';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './../../../config/firebaseConfig';
import { useEffect } from 'react';

export default function CourseView() {

    const { courseParams, courseId, enroll } = useLocalSearchParams();
    const [course, setCourse] = React.useState([]);
    //const course = JSON.parse(courseParams);
   // console.log(courseId);

    useEffect(() => {
        if (!courseParams) {
            GetCourseById();
        }
        else{
          setCourse(JSON.parse(courseParams));
        }
    }, [courseId]);

    const GetCourseById = async() => {
       const docRef = await getDoc(doc(db, 'Courses', courseId));
       const courseData = docRef.data();
       setCourse(courseData);
    }

    return course && (
        <FlatList
        data = {[]}
        ListHeaderComponent={
        <View style={{
                    backgroundColor: Colors.WHITE,
                    flex: 1,
                     }}>
          <Intro course={course} enroll={enroll} />
          <Chapters course={course} />

        </View>}/>
    );
}