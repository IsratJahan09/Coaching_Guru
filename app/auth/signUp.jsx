import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable, } from 'react-native'
import React from 'react'
import Colors from './../../constant/Colors';
import { useRouter } from 'expo-router';

export default function SignUp() {

    const router = useRouter();

  return (
    <View style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: 100,
        flex: 1,
        padding:25,
        backgroundColor: Colors.WHITE,

    }}>
      <Image source={require('./../../assets/images/logo.png')}
        style={{
            width: 180,
            height: 180,
        }}
      />
      <Text style={{
        fontSize: 30,
        fontFamily: 'outfit-bold',
     
      }}>Create New Account</Text>

      <TextInput placeholder='Full Name' style={styles.textInput}/>
      <TextInput placeholder='Email' style={styles.textInput}/>
      <TextInput placeholder='Password' secureTextEntry={true}
       style={styles.textInput}/>

       <TouchableOpacity
       style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        marginTop: 25,
        borderRadius: 10,
       }}
       >
        
        <Text style
        ={{
            textAlign: 'center',
            fontSize: 20,
            color: Colors.WHITE,
            fontFamily: 'outfit',
        }}>Create Account</Text>
       </TouchableOpacity>

      <View style={{
        display: 'flex',
        flexDirection: 'row',gap: 5,
        marginTop: 20,
      }}>
      <Text style={{
        fontFamily: 'outfit',
      }}>Already have an account?</Text>
       <Pressable 
       onPress={() => {router.push('/auth/signIn')}}
       >
                <Text style={{
            color: Colors.PRIMARY,
            fontFamily: 'outfit-bold',
                }}>Sign In Here</Text>
        </Pressable>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({ 
    textInput:{
        borderWidth: 1,
        width: '100%',
        padding: 15,
        fontSize: 18,
        marginTop: 20,
        borderRadius: 8,
    }
})