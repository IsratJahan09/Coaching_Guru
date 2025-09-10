import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { ActivityIndicator, Alert, Image, Platform, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import Colors from './../../constant/Colors';

export default function SignUp() {
    const router = useRouter();
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const showMessage = (message) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.BOTTOM);
        } else {
            Alert.alert('Message', message);
        }
    };

    const CreateNewAccount = () =>{
      if (!fullName || !email || !password) {
        showMessage('Please fill in all fields');
        return;
      }

      if (password.length < 6) {
        showMessage('Password must be at least 6 characters');
        return;
      }

      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
      .then(async(resp)=> {
        // Signed in 
        const user = resp.user;
        console.log(user);
        await SaveUser(user);
        setLoading(false);
        showMessage('Account created successfully! Please sign in.');
        // Redirect to sign in page after successful account creation
        router.replace('/auth/signIn');
      }
      ).catch(e=> {
        // error
        console.log(e.message);
        setLoading(false);
        showMessage(e.message);
      })
    }

      const SaveUser = async(user) => {
        const data = {
          fullName: fullName,
          email: email,
          member:false,
          uid: user?.uid,
        }
        await setDoc(doc(db, 'users', email), data);
        // Remove setUserDetail here since we're redirecting to sign in
        // setUserDetail(data);

        // Save user data to your database
      }

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
          marginTop: 100,
            width: 180,
            height: 180,
        }}
      />
      <Text style={{
        fontSize: 30,
        fontFamily: 'outfit-bold',
     
      }}>Create New Account</Text>

      <TextInput placeholder='Full Name' onChangeText={(value)=>setFullName(value)} style={styles.textInput}/>
      <TextInput placeholder='Email' onChangeText={(value)=>setEmail(value)} style={styles.textInput}/>
      <TextInput placeholder='Password' onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.textInput}/>

       <TouchableOpacity
        onPress={CreateNewAccount}
        disabled={loading}
       style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        marginTop: 25,
        borderRadius: 10,
        opacity: loading ? 0.7 : 1,
       }}
       >
        
       { !loading ? <Text style
        ={{
            textAlign: 'center',
            fontSize: 20,
            color: Colors.WHITE,
            fontFamily: 'outfit',
        }}>Create Account</Text> :
        <ActivityIndicator size={'large'} color={Colors.WHITE}/>
      }
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