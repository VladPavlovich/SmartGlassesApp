import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import mqtt from 'mqtt';

const HomeScreen = ({ navigation, contacts, setContacts }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [recognizedName, setRecognizedName] = useState('');

    useEffect(() => {
        console.log('Attempting to connect to MQTT broker...');
        const client = mqtt.connect('wss://broker.hivemq.com:8000/mqtt');

        client.on('connect', () => {
            console.log('Connected to MQTT broker');
            client.subscribe('face_recognition/names', (err) => {
                if (!err) {
                    console.log('Subscribed to topic: face_recognition/names');
                } else {
                    console.error('Subscription error:', err);
                }
            });
        });

        client.on('message', (topic, message) => {
            if (topic === 'face_recognition/names') {
                console.log('Message received on topic:', topic, 'Message:', message.toString());
                setRecognizedName(message.toString());
            }
        });

        client.on('error', (error) => {
            console.error('MQTT Client Error:', error);
        });

        client.on('offline', () => {
            console.warn('MQTT Client is offline');
        });

        client.on('close', () => {
            console.warn('MQTT Client is closed');
        });

        return () => {
            client.end();
        };
    }, []);

    const addContact = () => {
        if (name && phone) {
            setContacts([...contacts, { id: contacts.length.toString(), name, phone, additionalInfo: '' }]);
            setName('');
            setPhone('');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { contactId: item.id })}>
            <View style={styles.contactItem}>
                <Text style={styles.contactText}>{item.name} - {item.phone}</Text>
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
            <Button title="Add Contact" onPress={addContact} />
            <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
            />
            {recognizedName ? (
                <Text style={styles.recognizedText}>Recognized: {recognizedName}</Text>
            ) : null}
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
    recognizedText: {
        fontSize: 20,
        color: 'red',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default HomeScreen;
