import { Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../../constant/Colors';
import { imageAssets } from '../../constant/Option';
import CourseProgressCard from '../Shared/CourseProgressCard';
export default function CourseProgress({courseList}) {
     
    

    return (
        <View style={{
            marginTop: 10,
        }}>
            <Text style={{
                fontSize: 25,
                fontFamily: "outfit-bold",
                color: Colors.BLACK,

            }}>Progress</Text>

            <FlatList
            data = {courseList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <View key={index}>
                <CourseProgressCard item={item}  />
                </View>
            )}
        />
    </View>
    );
}