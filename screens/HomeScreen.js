import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Button, Text, Image, TouchableOpacity, View } from 'react-native'
import {Link} from '@react-navigation/native'
import { auth } from '../firebase'

const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const handleContacts = () => {
    navigation.replace("Contacts")
  }

  return (
    <View style={styles.container}>
      <Image style={{
        width: 80,
        height: 80,
        top: 40,
       }}
       source={require ('../assets/expoicon.png')}
    />

      <View style={styles.textview}>

      <Text>Logged in as: {auth.currentUser?.email}{'\n'}</Text>
      <Text style={styles.textstyle}> Welcome to our React Native android application!
      This application was designed to allow users to register, log in, view their contacts, and make a phone call! 
      Thanks to the resources learned in MIS475 and more.
      </Text>
    
      </View>

  
    
      <View style={styles.buttonview}>
      <TouchableOpacity 
        style={styles.button}  
        onPress={handleContacts}>
        <Text style={styles.buttonText}>Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      </View>
      

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textview:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textstyle:{
    fontSize: 18,
    fontFamily: 'sans-serif-condensed',
    textAlign: 'center',
    width: 300,
    
  },
  buttonview:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
   button: {
    backgroundColor: '#4333e9',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})