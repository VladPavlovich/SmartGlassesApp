// src/screens/EditScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addContact, updateContact } from '../firebaseService';

const EditScreen = ({ route, navigation, contacts, setContacts }) => {
    const { contactId, name: initialName } = route.params;
    const contact = contacts.find(c => c.id === contactId) || {
        name: initialName || '',
        phone: '',
        email: '',
        profession: '',
        details: ''
    };

    const [name, setName] = useState(contact.name);
    const [phone, setPhone] = useState(contact.phone);
    const [email, setEmail] = useState(contact.email);
    const [profession, setProfession] = useState(contact.profession);
    const [details, setDetails] = useState(contact.details);

    useEffect(() => {
        navigation.setOptions({ title: contactId ? 'Edit Contact' : 'Add Contact' });
    }, [navigation, contactId]);

    const saveContact = async () => {
        const newContact = { id: contactId, name, phone, email, profession, details };
        if (contactId) {
            await updateContact(newContact);
            const updatedContacts = contacts.map(c => (c.id === contactId ? newContact : c));
            setContacts(updatedContacts);
        } else {
            const id = await addContact(newContact);
            setContacts([...contacts, { id, ...newContact }]);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{contactId ? 'Edit Contact' : 'Add Contact'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Profession"
                value={profession}
                onChangeText={setProfession}
            />
            <TextInput
                style={styles.input}
                placeholder="Details"
                value={details}
                onChangeText={setDetails}
            />

            <Button
                color='#9dd3df'
                title="Save"
                onPress={saveContact}
            />
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
