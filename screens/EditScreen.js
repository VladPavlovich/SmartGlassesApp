import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditScreen = ({ route, navigation, contacts, setContacts }) => {
    const { contactId } = route.params;
    const contact = contacts.find(c => c.id === contactId);
    const [additionalInfo, setAdditionalInfo] = useState(contact ? contact.additionalInfo : '');

    useEffect(() => {
        navigation.setOptions({ title: 'back' });
    }, [navigation, contact]);

    const saveAdditionalInfo = () => {
        const updatedContacts = contacts.map(c =>
            c.id === contactId ? { ...c, additionalInfo } : c
        );
        setContacts(updatedContacts);
        navigation.goBack();
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contact List</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={contact.name}
                // onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="contact.phone"
                value={contact.phone}
                // onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={contact.email}
                // onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Profession"
                value={contact.profession}
                // onChangeText={setProfession}
            />
            <TextInput
                style={styles.input}
                placeholder="Additional Details"
                value={contact.details}
                // onChangeText={setDetails}
            />

            <Button title="Save" onPress={saveAdditionalInfo} /> 

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
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
