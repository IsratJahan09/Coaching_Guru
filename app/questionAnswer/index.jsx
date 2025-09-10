import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useState} from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../constant/Colors';
import { StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function QuestionAnswer() {
    const {courseParams} = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const qaList = course?.qa;
    const [selectedQuestion, setSelectedQuestion] = useState();
    const router = useRouter();
    
    const OnQuestionSelet = (index) => {
        if (selectedQuestion == index) {
            setSelectedQuestion(null);
        } else {
            setSelectedQuestion(index);
        }
    }
    return (
        <View>
            <Image source={require('./../../assets/images/wave.png')}
                        style={{
                            height: 650,
                            width: '100%',
                        }}
            />
            <View style={{
                padding: 20,
                position: 'absolute',
                width: '100%',
                marginTop: 35,
            }}>
         <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
         }}>
            <Pressable onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={30} color="white" />
            </Pressable>
                <Text style={{
                    fontSize: 28,
                    fontFamily: 'outfit-bold',
                    color: Colors.WHITE,
                }}>Question & Answer</Text>
          </View>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit',
                    color: Colors.WHITE,
                }}>{course?.courseTitle}</Text>

               <FlatList
                  data = {qaList}
                  renderItem={({item, index}) => (
                    <Pressable style={styles.card}
                        onPress={() => OnQuestionSelet(index)}
                    
                    >
                        <Text style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 20,
                        }}>{item?.question}</Text>
                        {selectedQuestion === index && 
                        <View style={{
                            borderTopWidth: 0.4,
                            marginVertical: 10,
                        }}>
                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 18,
                                marginTop: 10,
                                color: Colors.GREEN,
                            }}>Answer: {item?.answer}</Text>
                        </View>
                  }
                    </Pressable>
                    )}
               />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        padding: 20,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: 15,
        elevation: 1,   
    }
});
