

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import EditScreen from './src/screens/EditScreen';
import { getAllContacts } from './src/firebaseService';

const Stack = createStackNavigator();

const App = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            const fetchedContacts = await getAllContacts();
            setContacts(fetchedContacts);
        };
        fetchContacts();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home">
                    {props => <HomeScreen {...props} contacts={contacts} setContacts={setContacts} />}
                </Stack.Screen>
                <Stack.Screen name="Details">
                    {props => <DetailsScreen {...props} contacts={contacts} setContacts={setContacts} />}
                </Stack.Screen>
                <Stack.Screen name="Edit Contact">
                    {props => <EditScreen {...props} contacts={contacts} setContacts={setContacts} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
