import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const DetailsScreen = ({ route, navigation, contacts, setContacts }) => {
    const { contactId } = route.params;
    const contact = contacts.find(c => c.id === contactId);
    const [additionalInfo, setAdditionalInfo] = useState(contact ? contact.additionalInfo : '');

    useEffect(() => {
        navigation.setOptions({ title: 'Home' });
    }, [navigation, contact]);



    // const saveAdditionalInfo = () => {
    //     const updatedContacts = contacts.map(c =>
    //         c.id === contactId ? { ...c, additionalInfo } : c
    //     );
    //     setContacts(updatedContacts);
    //     navigation.goBack();
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name: {contact.name}</Text>
            <Text style={styles.label}>Phone: {contact.phone}</Text>
            <Text style={styles.label}>Email: {contact.email}</Text>
            <Text style={styles.label}>Profession: {contact.profession}</Text>
            <Text style={styles.label}>Details: {contact.details}</Text>


            <Button 
            color='#9dd3df'
            title="Edit Contact" 
            onPress={()=>navigation.navigate("Edit Contact", { contactId: contact.id })} />

            {/* <TextInput
                style={styles.input}
                placeholder="Additional Info"
                value={additionalInfo}
                onChangeText={setAdditionalInfo}
            />
            <Button title="Save" onPress={saveAdditionalInfo} /> */}
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

export default DetailsScreen;
