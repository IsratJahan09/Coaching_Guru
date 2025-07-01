import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable,  } from 'react-native'
import React, {useState, useContext} from 'react'
import Colors from './../../constant/Colors';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebaseConfig'; // Adjust the import path as necessary
import { setDoc, doc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';
export default function SignUp() {

    const router = useRouter();

    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {userDetail, setUserDetail}=useContext(UserDetailContext)

  const CreateNewAccount=() => {
   createUserWithEmailAndPassword(auth, email, password)
   .then(async(resp)=>{
      const user = resp.user;
      console.log(user);  //save user data to database
      await SaveUser(user);
   })
   .catch(e=>{
      console.log(e.message);
   })
  }

  const SaveUser = async(user) => {
    const data = {
      name: fullName,
      email: email,
      member: false, //default member status is false
      uid:user?.uid
  }
    await setDoc(doc(db, 'users', email), data)

    setUserDetail(data);
    //navigate to the home screen after saving user data

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
      <TextInput placeholder='Password' onChangeText={(value)=>setPassword(value)} secureTextEntry={true}
       style={styles.textInput}/>

       <TouchableOpacity
         onPress={CreateNewAccount}
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