import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation, contacts, setContacts }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [details, setDetails] = useState('');

    const addContact = () => {
        if (name && phone) {
            setContacts([...contacts, { id: contacts.length.toString(), name, phone, email, profession, details }]);
            setName('');
            setPhone('');
            setEmail('');
            setProfession('');
            setDetails('');
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
                placeholder="Additional Details"
                value={details}
                onChangeText={setDetails}
            />
            
            <Button title="Add Contact" onPress={addContact} />

            <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
        marginTop: 20,
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
