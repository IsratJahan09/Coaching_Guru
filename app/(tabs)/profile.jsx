import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { useRouter } from 'expo-router';
import { UserDetailContext } from './../../context/UserDetailContext';
import Colors from './../../constant/Colors';
import { Ionicons } from '@expo/vector-icons';
import { ProfileMenu } from '../../constant/Option';
export default function Profile() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const router = useRouter();

    const onMenuClick = (menu) => {
        if (menu.name == 'Logout') {
            signOut(auth)
                .then(() => {
                    setUserDetail(null);
                    router.push('/');
                })
                .catch((error) => console.log(error));
        } else {
            if (menu.path) router.push(menu.path);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Profile</Text>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
                <Image
                    source={require('./../../assets/images/logo.png')} // put your logo or user avatar
                    style={styles.profileImage}
                />
                <Text style={styles.userName}>
                    {userDetail?.fullName || "Guest User"}
                </Text>
                <Text style={styles.userEmail}>
                    {userDetail?.email || "admin@israt.com"}
                </Text>
            </View>

            {/* Menu List */}
            <View style={styles.menuContainer}>
                {ProfileMenu.map((menu, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={() => onMenuClick(menu)}
                    >
                        <Ionicons name={menu.icon} size={22} color={Colors.PRIMARY} />
                        <Text style={styles.menuText}>{menu.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontFamily: 'outfit-bold',
        color: Colors.BLACK,
        marginTop: 10,
    },
    profileInfo: {
        alignItems: 'center',
    },
    profileImage: {
        width: 180,
        height: 230,
        borderRadius: 45,
        marginTop: 60,
    },
    userName: {
        fontSize: 30,
        fontFamily: 'outfit-bold',
        color: Colors.BLACK,
    },
    userEmail: {
        fontSize: 24,
        color: '#666',
    },
    menuContainer: {
        marginTop: 14,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 19,
        backgroundColor: Colors.BG_GRAY,
        shadowColor: Colors.GRAY,
        shadowOffset: { width: 0, height: 1 },
        borderRadius: 12,
        marginBottom: 12,
    },
    menuText: {
        marginLeft: 12,
        fontSize: 24,
        fontFamily: 'outfit',
        color: Colors.BLACK,

    },
});
