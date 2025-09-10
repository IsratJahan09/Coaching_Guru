import {View, Text, Image, StyleSheet, Button, TouchableOpacity, Pressable} from "react-native-web";
import React, {useEffect, useState} from "react";
import { useLocalSearchParams } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from "../../constant/Colors";
import { FlatList } from "react-native-web";
import { Dimensions } from "react-native";
import FlipCard from "react-native-flip-card";
import * as Progress from 'react-native-progress';
import {useRouter} from "expo-router";

export default function Flashcards() {
    const {courseParams} = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const flashcard = course?.flashcards;
    const [currentPage, setCurrentPage] = useState(0);
    const width = Dimensions.get('window').width;
    const router = useRouter();

    const onScroll = (event) => {
        const index = Math.round(event?.nativeEvent?.contentOffset.x / width );
        console.log(index);
        setCurrentPage(index);
    }

        const GetProgress = (currentPage) => {
        const perc = (currentPage / flashcard?.length) ;
        return perc;
    }

    return (
        <View>
            <Image source={require('./../../assets/images/wave.png')} 
            style={{ width: '100%', height: 650 }} />
             <View style={{
            position:'absolute',
            padding: 25,
            width: '100%',
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={30} color="white" />
                </Pressable>
                <Text style={{ 
                    fontFamily: 'outfit-bold',
                    fontSize: 25,
                    color: Colors.WHITE,
                    }}>{currentPage+1} of {flashcard?.length}</Text>
            </View>
            <View style={{
                marginTop: 20,
            }}>
                <Progress.Bar progress = {GetProgress(currentPage)} width={Dimensions.get('window').width*0.85} 
                color={Colors.WHITE} height={10}
                 />
            </View>
                <FlatList 
                data={flashcard}
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll = {onScroll}
                renderItem={({item, index})=> (
                    <View style={{
                        height: 500,
                        width: width*0.9,
                        marginTop: 60,

                    }}>
                       <FlipCard style={styles.flipCard}>
                        <View style={styles.frontCard}>
                            <Text style={{
                                fontFamily: 'outfit-bold',
                                fontSize: 28,

                            }}>{item?.front}</Text>
                        </View>
                        <View style={styles.blackCard}>
                            <Text style={{
                                width: Dimensions.get('screen').width*0.74,
                                fontFamily: 'outfit',
                                padding: 20,
                                fontSize: 28,
                                textAlign: 'center',
                                color: Colors.WHITE,
                            }} >{item?.back}</Text>
                        </View>
                       </FlipCard>
                    </View>
                )} />
        </View>
            

    </View>
    )
}
 

const styles = StyleSheet.create({
    flipCard:{
        width: Dimensions.get('screen').width*0.75,
        height: 400,
        backgroundColor: Colors.WHITE,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20,
        marginHorizontal: Dimensions.get('screen').width*0.05,

    },
    frontCard: {
       display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRadius: 20,
        
    },
    blackCard:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', 
       borderRadius: 20,
        backgroundColor: Colors.PRIMARY,

    }
})