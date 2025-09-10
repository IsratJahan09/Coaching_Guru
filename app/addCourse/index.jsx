import {View, Text, TextInput, StyleSheet, Pressable,} from 'react-native';
import React, {useState, useContext}  from 'react';
import Colors from './../../constant/Colors';
import Button from '../../components/Shared/Button';
import { GenerateTopicsAIModel } from '../../config/AiModel';
import { GenerateCourseAIModel } from '../../config/AiModel';
import Prompt from '../../constant/Prompt';
import {setDoc, doc, serverTimestamp} from 'firebase/firestore';
import {db} from './../../config/firebaseConfig';
import {UserDetailContext} from './../../context/UserDetailContext';
import {useRouter} from 'expo-router';
import { ScrollView } from 'react-native-web';
export default function AddCourse() {
    const [loading, setLoading] = useState(false);
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [userInput, setUserInput] = useState('');
    const [topics, setTopics] = useState([]); // This is correct
    const [selectedTopics, setSelectedTopics] = useState([]); // This is correct  
    const [error, setError] = useState('');
    const router = useRouter();
    const onGenerateTopic = async () => {
        //  if (!userInput.trim()) return;
        console.log(userDetail);
        // if(userDetail?.member == false){
        //   router.push('/subscriptionWall')
        //   return;
        // }
        setLoading(true);
        const PROMPT = userInput+Prompt.IDEA;
        const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT)
        const topicIdea = JSON.parse(aiResp.response.text());
        console.log(topicIdea);
        //get topic idea from AI
        setTopics(topicIdea?.course_titles);
        setLoading(false);
    }


    const onTopicSelect = (topic) => {
      const isAlreadyExist = selectedTopics.find((item) => item == topic);
        if (!isAlreadyExist) {
            setSelectedTopics(prev=>[...prev, topic]);
        } else {
          const topics = selectedTopics.filter((item) => item !== topic);
          setSelectedTopics(topics);
        }
    }

    const isTopicSelected = (topic) => {
      const selection = selectedTopics.find((item) => item == topic);
      return selection ? true : false;
    }

    //generate course using Ai model
      const onGenerateCourse = async () => {
        setLoading(true);
        const PROMPT = selectedTopics+Prompt.COURSE;
        try{
        const aiResp = await  GenerateCourseAIModel.sendMessage(PROMPT)
        const resp = JSON.parse(aiResp.response.text());
        const courses = resp.courses;
        console.log(courses);

        // Use Promise.all to wait for all courses to be saved
        await Promise.all(courses?.map(async(course, index) => {
          const docId = Date.now().toString() + '_' + index; // Prevent duplicate IDs
          await setDoc(doc(db, 'Courses', docId), {
            ...course,
            createdOn: new Date(),
            createdBy: userDetail?.email ?? '',
            docId: docId,
            completedChapter: [], // Initialize as empty array
          })
        }))
        
        router.push('/(tabs)/home');
        setLoading(false);
    } catch (e) {
      console.log(e);
        setLoading(false);
    }

}

// const onGenerateCourse = async () => {
//   setLoading(true);
//   try {
//     const PROMPT = selectedTopics.join(', ') + Prompt.COURSE;
//     const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
    
//     // Add response validation
//     if (!aiResp?.response?.text()) {
//       throw new Error('Empty response from AI');
//     }
    
//     const resp = JSON.parse(aiResp.response.text());
//     const courses = resp.courses;

//     if (!courses || !Array.isArray(courses)) {
//       throw new Error('Invalid course data format');
//     }

//     // Create all courses in parallel
//     await Promise.all(courses.map(async (course) => {
//       const courseRef = doc(db, 'Courses'); // Auto-generate ID
//       await setDoc(courseRef, {
//         ...course,
//         createdOn: serverTimestamp(), // Server-side timestamp
//         createdBy: userDetail?.email || 'anonymous',
//         selectedTopics: selectedTopics,
//         originalIdea: userInput
//       });
//       console.log('Course created with ID:', courseRef.id);
//     }));

//     router.push('/(tabs)/home');
//   } catch (e) {
//     console.error('Course creation error:', e);
//     setError('Failed to create courses: ' + e.message);
//   } finally {
//     setLoading(false);
//   }
// }

  return (
       <ScrollView style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1,
    }}
        >
      <Text style = {{
        fontFamily: 'outfit-bold',
        fontSize: 30,
      
      }}>Create New Course</Text>
        <Text
        style={{
          fontFamily: 'outfit',
          fontSize: 30,
        }}>What you want to learn Today?</Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 20,
          marginTop: 8,
          color: Colors.GRAY,
        }}>What course you want to create (Ex. learn python, react, Digital_Marketing Guide, 10th chapter science etc.)</Text>
   
        <TextInput  placeholder='(Ex. Learn python, learn 12th Chemistry)'
        style={[styles.textInput, {color: Colors.GRAY}]}
        numberOfLines={3}
        multiline={true}
        onChangeText={(value) => setUserInput(value)}
        />

        <Button text={'Generate Topic'} type='outline'
         onPress={() => onGenerateTopic()} loading={loading} />

        <View style={{
          marginTop: 15,
          marginBottom: 10,
        }}>
          <Text  style={{
            fontFamily: 'outfit',
            fontSize: 20,
          }}>Select all topics which you want to add in the course</Text>
       

         <View style={{
          display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            marginTop: 6,
          }}>
           {topics.map((item, index) => (
            <Pressable key={index} onPress={() => onTopicSelect(item)}>
              <Text style={{
                padding: 7,
                borderWidth: 0.4,
                borderRadius: 99,
                paddingHorizontal: 15,
                backgroundColor : isTopicSelected(item)?Colors.PRIMARY:null,
                color : isTopicSelected(item)?Colors.WHITE:Colors.PRIMARY,

              }} >{item}</Text>
            </Pressable>
           ))}
         </View>
        </View>

       {selectedTopics.length > 0 && <Button text='Generate Course' 
        onPress={() => onGenerateCourse()}
        loading={loading}
         />}
    </ScrollView>

  );
}

const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        height: 100,
        marginTop: 10,
        alignItems: 'flex-start',
        fontSize: 18,

}
});

