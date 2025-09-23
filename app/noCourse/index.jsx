import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import NoCourse from '../../components/Home/NoCourse';
import Colors from '../../constant/Colors';

export default function NoCourseScreen() {
    const router = useRouter();

    const handleBackPress = () => {
        router.back('/');
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('./../../assets/images/wave.png')}
                style={styles.waveImage}
            />
            <View style={styles.contentContainer}>
                {/* Back Button */}
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={32} color={Colors.BLACK} />
                </TouchableOpacity>
                
                <NoCourse />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    waveImage: {
        position: 'absolute',
        width: '100%',
        height: 500,
    },
    contentContainer: {
        flex: 1,
        padding: 25,
        paddingTop: 80,
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 15,
        zIndex: 5,
        padding: 5,
    },
    header: {
        fontSize: 30,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 20,
        color: Colors.PRIMARY,
    },
});
