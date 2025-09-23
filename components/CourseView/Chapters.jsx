import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../../constant/Colors';

export default function Chapters({course}) {
    const router = useRouter();
    const [completedChapters, setCompletedChapters] = useState([]);

    useEffect(() => {
        if (course?.completedChapter) {
            setCompletedChapters(course.completedChapter);
        }
    }, [course?.completedChapter]);

    const isChapterCompleted = (index) => {
        return completedChapters.includes(index);
    }

    const handleChapterPress = (item, index) => {
        // Mark chapter as completed when clicked
        if (!completedChapters.includes(index)) {
            setCompletedChapters(prev => [...prev, index]);
        }
        
        router.push({
            pathname:'/chapterView',
            params: {
                chapterParams:JSON.stringify(item),
                docId:course?.docId,
                chapterIndex:index,
            }
        });
    }

    return (
        <View style={{
            padding: 20,
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25,
            }}>Chapters</Text>
            <FlatList
            data = {course?.chapters}
            renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => handleChapterPress(item, index)} style={{
                    padding: 18,
                    borderWidth: 0.5,
                    borderRadius: 15,
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                        
                    }}
                        >
                        <Text style={styles.chapterText}>{index+1}.</Text>
                        <Text style={styles.chapterText}>
                            {item?.chapterName}
                        </Text>
                    </View>
                   {isChapterCompleted(index) ?
                   <Ionicons name="checkmark-circle" size={24} color={Colors.GREEN} />
                   :<Ionicons name="play" size={24} color={Colors.PRIMARY} />}
                </TouchableOpacity>
            )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    chapterText:{
        fontFamily: 'outfit-bold',
        fontSize: 20,
    }
})