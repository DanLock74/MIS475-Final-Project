import { useNavigation } from '@react-navigation/native'
import React, {useState, useEffect} from 'react';
import { PermissionsAndroid,
  Platform,
  SafeAreaView,
  Linking,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput, TouchableOpacity} from 'react-native'
import { auth } from '../firebase'
import * as Contacts from 'expo-contacts';
import ListItem from '../components/ListItems';



const Contact = () => {
    const navigation = useNavigation()

      const handleHome = () => {
        navigation.replace("Home")
      }


    let [contacts, setContacts] = useState([]);

    useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
        }

        

        
      }
    })();
  }, []);

    
    const loadContacts = () => {
      
    Contacts.getContactsAsync((err, contacts) => {
      contacts.sort(
        (a, b) => 
          a.givenName.toLowerCase() > b.givenName.toLowerCase(),
      );
      console.log('contacts -> ', contacts);
      if (err === 'denied') {
        alert('Permission to access contacts was denied');
        console.warn('Permission to access contacts was denied');
      } else {
        setContacts(contacts);
        console.log('contacts', contacts);
      }
    });
  };

   const openContact = (contact) => {
    console.log(JSON.stringify(contact));
    Contacts.openExistingContact(contact, () => {});
  };

  const [textnb, handleCall] = useState("");

  const pressCall=()=>{
    const phone = handleCall()
    Linking.openURL('tel:'+phone)}
  
  

  return (
    
      <View style={styles.container}>
        <Text style={styles.header}>
          Find your contacts listed here
        </Text>
        <FlatList
          data={contacts}
          renderItem={(contact) => {
            {
              console.log('contact -> ' + JSON.stringify(contact));
            }
            return (
              <ListItem
                key={contact.item.recordID}
                item={contact.item}
                onPress={openContact}
              />
            );
          }}
          keyExtractor={(item) => item.recordID}
        />
        
        <TextInput
            style={styles.phonenb}
            label="Number"
            placeholder='Number'
            value={Text}
            onChangeText={textnb => handleCall(textnb)}/>
            <TouchableOpacity
                onPress={pressCall}
                style={styles.button}>
                <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleHome}
                style={styles.button}>
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            
      </View>
    
  );
};
export default Contact;

const styles = StyleSheet.create({
    container: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#4333e9',
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 20,
    borderRadius: 10,
  },
  
  button: {
    backgroundColor: '#4333e9',
    width: '30%',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  phonenb:{
    height: 40,
    width: '30%',
    borderRadius: 10,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    borderColor: '#4333e9',
    
  }
  
});

   