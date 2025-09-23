import { useRouter } from 'expo-router';
import { Image, Text, View } from 'react-native';
import Button from '../Shared/Button';

export default function NoCourse() {
    const router = useRouter();

    return (
        <View style={{
            marginTop:80,
            display: 'flex',
            alignItems: 'center',

        }}>
            <Image source={require('./../../assets/images/book.png')}
            style={{
                width: 200,
                height: 200,
            }}/>
             <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25,
                 textAlign: 'center' }}
             >You Don&apos;t Have Any Courses Yet</Text>
             <Button text={'+ Create New Course'} onPress={() => router.push('/addCourse')}/>
             <Button text={'Explore Existing Courses'} onPress={() => router.push('/exploreCourses')} 
             type="outline"/>
       </View>
    )
}