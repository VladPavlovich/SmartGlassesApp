import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditScreen = ({ route, navigation, contacts, setContacts }) => {
    const { contactId } = route.params;
    const contact = contacts.find(c => c.id === contactId);
    const [name, setName] = useState(contact ? contact.name : '');
    const [phone, setPhone] = useState(contact ? contact.phone : '');
    const [email, setEmail] = useState(contact ? contact.email : '');
    const [profession, setProfession] = useState(contact ? contact.profession : '');
    const [details, setdetails] = useState(contact ? contact.details : '');

    useEffect(() => {
        navigation.setOptions({ title: 'back' });
    }, [navigation, contact]);

    const saveAdditionalInfo = () => {
        const updatedContacts = contacts.map(c =>
            c.id === contactId ? { ...c, details } : c
        );
        setContacts(updatedContacts);
        navigation.goBack();
    };



    return (
        <View style={styles.container}>
            <Text style={[styles.title, {marginBottom:20}]}>Edit Contact</Text>
            <TextInput
                editable
                style={styles.input}
                placeholder="Name"
                value={contact.name}
                // onChangeText={setName}
            />
            <TextInput
                editable
                style={styles.input}
                placeholder="contact.phone"
                value={contact.phone}
                // onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                editable
                style={styles.input}
                placeholder="Email"
                value={contact.email}
                // onChangeText={setEmail}
            />
            <TextInput
                editable
                style={styles.input}
                placeholder="Profession"
                value={contact.profession}
                // onChangeText={setProfession}
            />
            <TextInput
                editable
                style={styles.input}
                placeholder="Additional Details"
                value={contact.details}
                // onChangeText={setDetails}
            />

            <Button 
            color='#9dd3df'
            title="Save" 
            onPress={saveAdditionalInfo} /> 

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
});

export default EditScreen;
