import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Colors from './../../constant/Colors';
import { UserDetailContext } from './../../context/UserDetailContext';


export default function Header() {
    const router = useRouter();
    const {userDetail, setUserDetail} = useContext(UserDetailContext);

    const handleSettingsPress = () => {
        // Navigate to no course page
        router.push('/noCourse');
    };

    return (

        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

        }} >
         <View>
             <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 28,
                color:Colors.WHITE,
                marginTop:25,

             }}>Hello, {userDetail?.fullName}</Text>
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 17,
              color:Colors.WHITE,
            }}>Let&apos;s Get Started!</Text>
         </View>
         <TouchableOpacity onPress={handleSettingsPress}>
            <Ionicons name="settings-outline" size={32} color={Colors.BLACK}/>
         </TouchableOpacity>

        </View>
    );
    }