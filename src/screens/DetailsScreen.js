// src/screens/DetailsScreen.js

import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetailsScreen = ({ route, navigation, contacts }) => {
    const { contactId } = route.params;
    const contact = contacts.find(c => c.id === contactId);

    useEffect(() => {
        navigation.setOptions({ title: contact.name });
    }, [navigation, contact]);

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
                onPress={() => navigation.navigate('Edit Contact', { contactId: contact.id })}
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
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default DetailsScreen;
