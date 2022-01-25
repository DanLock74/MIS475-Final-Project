import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState, Component } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Platform, Keyboard } from 'react-native'
import { auth } from '../firebase'


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }


  return (

    <View
      style={styles.container}
      behavior={Platform.OS === "android" ? "padding" : "height"}
    >
    <View style={{
      flex: 1,
      top: 40,
    }}>
    <Image style={{
        width: 475,
        height: 180,
        resizeMode: 'center',
        top:0,
       }}
       source={require ('../assets/expologo.png')}
    />
    </View>


      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    justifyContent: 'center',
    flex: 1,
    bottom: 0,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    flex: 1,
    bottom: 40,
    
  },
  button: {
    backgroundColor: '#4333e9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#4333e9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#4333e9',
    fontWeight: '700',
    fontSize: 16,
  },
})