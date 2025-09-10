import { View, Text, Image, StyleSheet, Button, TouchableOpacity} from "react-native-web";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import { FlatList } from "react-native-gesture-handler";

export default function QuizSummery() {
    const { quizResultParam } = useLocalSearchParams();
    const quizResult = JSON.parse(quizResultParam);
    const [correctAns, setCorrectAns] = useState(0);
    const [totalQuestion, setTotalQuestion] = useState(0);
    const router = useRouter();

     useEffect(() => {
        CalculateResult();
     }, [quizResult]);

   const CalculateResult=() => {
    if(quizResult !== undefined){
        const correctAns_ = Object.entries(quizResult)
        ?.filter(([key, value]) => value?.isCorrect==true)
        const totalQues_ = Object.keys(quizResult).length;
        setCorrectAns(correctAns_.length);
        setTotalQuestion(totalQues_);


    }
}

    const GetPercMark=() => {
        return ((correctAns / totalQuestion) * 100).toFixed(0);

    }

    return (
        <FlatList
            data={[]} // Dummy data to render a single item
            ListHeaderComponent={

        <View>
            <Image source={require('./../../assets/images/wave.png')}
            style={{
                height: 650,
                width: '100%',
            }}
            />
            <View style={{
                position: 'absolute',
                width: '100%',
                padding: 35,
            }}>
                <Text style={{
                    fontSize: 30,
                    fontFamily: 'outfit-bold',
                    color: Colors.WHITE,
                    textAlign: 'center',
                }}>Quiz Summary</Text>

                <View style={{
                    backgroundColor: Colors.WHITE,
                    padding: 20,
                    borderRadius: 20,
                    marginTop: 60,
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Image source={require('./../../assets/images/trophy.png')}
                    style={{
                        height: 100,
                        width: 100,
                        marginTop: -60,
                    }}
                    />
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 26,
                    }}>{GetPercMark()>60 ? 'Congratulations!' : 'Better luck next time!'}</Text>
                    <Text
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 17,
                        color: Colors.GRAY,
                    }}
                    >You gave {GetPercMark()}% Correct Answer</Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                    }}> 
                        <View style={styles.resultTextContainer}>
                            <Text style={styles.resultText}>Q {totalQuestion}</Text>
                        </View>
                        <View style={styles.resultTextContainer}>
                            <Text style={styles.resultText}>Q
                                ✅{correctAns} Correct</Text>
                        </View>
                        <View style={styles.resultTextContainer}>
                            <Text style={styles.resultText}>❌ {totalQuestion - correctAns} InCorrect</Text>
                        </View>
                    </View>
                    
                </View>
                <TouchableOpacity 
                    onPress={() => router.replace('/(tabs)/home')}
                    style={{
                        marginTop: 20,
                        backgroundColor: Colors.PRIMARY,
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center'
                    }}
                    >
                    <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit' }}>
                        Back to Home
                    </Text>
                </TouchableOpacity>
                    <View style={{
                        marginTop: 25,
                        flex: 1,
                    }}>
                        <Text style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 24,
                        }}>Summary:</Text>
                        <FlatList 
                               data ={Object.entries(quizResult)}
                               renderItem={({item, index})=>{
                                const quizItem = item[1];
                                return (
                                    <View style={{
                                        padding: 15,
                                        borderWidth: 1,
                                        marginTop: 5,
                                        borderRadius: 15,
                                        backgroundColor: quizItem.isCorrect == true ? Colors.LIGHT_GREEN : Colors.LIGHT_RED,
                                        borderColor: quizItem.isCorrect == true ? Colors.GREEN : Colors.RED,
                                    }}
                                        >
                                        <Text style={{
                                            fontFamily: 'outfit',
                                            fontSize: 20,
                                        }}
                                        >{quizItem.question}</Text>
                                        <Text style={{
                                            fontFamily: 'outfit',
                                            fontSize: 15,
                                        }}>Ans: {quizItem.correctAns}</Text>
                                     </View>
                                )
                               }}
                               />
                    </View>
            </View>
        </View>
       }
        />
    )
}

const styles = StyleSheet.create({
    resultTextContainer: {
        padding: 5,
        backgroundColor: Colors.WHITE,
        elevation:1,

    },
    resultText:{
        fontFamily: 'outfit',
        fontSize: 20,
        
    }
});
