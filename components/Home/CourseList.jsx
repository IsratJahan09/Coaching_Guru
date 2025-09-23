import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { imageAssets } from '../../constant/Option';
import Colors from '../../constant/Colors';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
export default function CourseList({courseList, heading="Courses", enroll = false}) {
    const router = useRouter();

    return (
        <View style={{
            marginTop: 15,
        }}
            >
            <Text style={{
                fontSize: 25,
                fontFamily: 'outfit-bold',
            }}>{heading}</Text>

            <FlatList
                data={courseList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                    onPress={()=>router.push({
                        pathname: '/courseView/'+item?.docId,
                        params: {
                            courseParams: JSON.stringify(item),
                            enroll: enroll,
                         }
                    })}
                    key={index} style={styles.courseContainer}>
                        <Image source={imageAssets[item.banner_image]}
                        style={{
                            width: '100%',
                            height: 150,
                            borderRadius: 15,
                        }}
                        />
                        <Text style={{
                            fontSize: 18,
                            fontFamily: 'outfit-bold',
                            marginTop: 10,
                        }}>{item?.courseTitle}</Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                            marginTop: 5,
                            alignItems: 'center',
                            }}>
                            <Ionicons name="book-outline" size={24} color="black" />
                        <Text style={{
                            fontFamily: 'outfit',
                        }}
                        >
                            
                            {item?.chapters?.length} Chapters</Text>
                    </View>
                     </TouchableOpacity>

                )}
                // keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    courseContainer:  {
        padding: 10,
       backgroundColor: Colors.BG_GRAY,
       margin: 6,
         borderRadius: 15,
         width: 260,
    },
})
