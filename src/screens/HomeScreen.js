// src/screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { getNames } from '../api';
import { getContactByName, addContact } from '../firebaseService';

const HomeScreen = ({ navigation, contacts, setContacts }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [details, setDetails] = useState('');

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const names = await getNames();
            console.log("Fetched names:", names);

            const fetchedContacts = [];
            for (const name of names.recognized_names) {
                const contact = await getContactByName(name);
                if (contact) {
                    fetchedContacts.push(contact);
                } else {
                    // Create new contact if not found
                    const newContact = { name, phone: '', email: '', profession: '', details: '' };
                    const id = await addContact(newContact);
                    if (id) {
                        fetchedContacts.push({ id, ...newContact });
                    }
                }
            }

            setContacts(fetchedContacts);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            Alert.alert('Error', 'An error occurred while fetching contacts.');
        }
    };

    const scanForLatestName = async () => {
        try {
            const names = await getNames();
            if (names.recognized_names.length > 0) {
                const latestName = names.recognized_names[0];
                const contact = await getContactByName(latestName);
                if (contact) {
                    navigation.navigate('Details', { contactId: contact.id });
                } else {
                    navigation.navigate('Edit Contact', { contactId: null, name: latestName });
                }
            } else {
                Alert.alert("No names found", "No names were identified by the API.");
            }
        } catch (error) {
            console.error('Error scanning for latest name:', error);
            Alert.alert('Error', 'An error occurred while scanning for the latest name.');
        }
    };

    const addNewContact = async () => {
        if (name && phone) {
            try {
                const newContact = { name, phone, email, profession, details };
                const id = await addContact(newContact);
                if (id) {
                    setContacts([...contacts, { id, ...newContact }]);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setProfession('');
                    setDetails('');
                    Keyboard.dismiss();
                }
            } catch (error) {
                console.error('Error adding new contact:', error);
                Alert.alert('Error', 'An error occurred while adding a new contact.');
            }
        } else {
            Alert.alert('Validation Error', 'Name and phone are required fields.');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { contactId: item.id })}>
            <View style={styles.contactItem}>
                <Text style={styles.contactText}>{item.name} - {item.profession}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contact List</Text>

            <Button
                title="Scan for Latest Name"
                onPress={scanForLatestName}
            />

            { (contacts.length > 0) ? 
            <FlatList
                data={contacts || []}
                renderItem={renderItem}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                style={styles.list}
            />
            : <FlatList data="no contacts yet..." style={styles.list}/>}

            <View style={styles.form}>
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
                    multiline
                    numberOfLines={2}
                    style={styles.input}
                    placeholder="Additional Details"
                    value={details}
                    onChangeText={setDetails}
                />

                <Button
                    style={styles.form}
                    color='#991818'
                    title="Add New Contact"
                    onPress={addNewContact}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#c9d1d3',
    },
    form: {
        borderWidth: 5,
        borderColor: '#9dd3df',
        backgroundColor: '#9dd3df',
        marginTop: 20,
        padding: 5,
    },
    title: {
        fontSize: 32,
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
    list: {
        borderColor: '#9dd3df',
        borderWidth: 10,
        backgroundColor: '#f7f7f7',
    },
    contactItem: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    contactText: {
        fontSize: 18,
    },
});

export default HomeScreen;
