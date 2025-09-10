import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import CourseList from '../../components/Home/CourseList';
import { db } from '../../config/firebaseConfig';
import Colors from '../../constant/Colors';
import {Ionicons} from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function ExploreCourses() {
    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        GetAllCourses();
    }, []);

    const GetAllCourses = async () => {
        setLoading(true);
        setAllCourses([]);
        const q = query(collection(db, 'Courses'), orderBy('createdOn', 'desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setAllCourses(prev => [...prev, doc.data()]);
        });
        setLoading(false);
    }

    if (loading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.WHITE
            }}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
                <Text style={{
                    marginTop: 10,
                    fontFamily: 'outfit',
                    fontSize: 16
                }}>Loading courses...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={[]}
            onRefresh={() => GetAllCourses()}
            refreshing={loading}
            style={{
                flex: 1,
                backgroundColor: Colors.WHITE,
            }}
            ListHeaderComponent={
                <View style={{
                    padding: 25,
                    backgroundColor: Colors.WHITE,
                    flex: 1,
                }}>
                    <Pressable onPress={() => router.back('/')}>
                         <Ionicons name="arrow-back" size={30} color="black" />
                     </Pressable>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 30,
                        marginTop: 50,
                        marginBottom: 20,
                        textAlign: 'center'
                    }}>Explore All Courses</Text>
                    
                    {allCourses?.length > 0 ? (
                        <CourseList courseList={allCourses} />
                    ) : (
                        <View style={{
                            marginTop: 100,
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 18,
                                textAlign: 'center',
                                color: Colors.GRAY
                            }}>No courses available yet</Text>
                        </View>
                    )}
                </View>
            }
        />
    );
}