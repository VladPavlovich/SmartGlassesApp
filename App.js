import './shim';

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@src/screens/HomeScreen';
import DetailsScreen from '@src/screens/DetailsScreen';

const Stack = createStackNavigator();

const App = () => {
    const [contacts, setContacts] = useState([]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home">
                    {props => <HomeScreen {...props} contacts={contacts} setContacts={setContacts} />}
                </Stack.Screen>
                <Stack.Screen name="Details">
                    {props => <DetailsScreen {...props} contacts={contacts} setContacts={setContacts} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
