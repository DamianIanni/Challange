import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen';
import {NotificationsScreen} from './src/screens/NotificationsScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationsScreen}
          options={{
            title: 'Notifications',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
