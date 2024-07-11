import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import EditScreen from './screens/EditScreen';

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

          <Stack.Screen name="Edit Contact">
            {props => <EditScreen {...props} contacts={contacts} setContacts={setContacts} />}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
