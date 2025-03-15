import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen';
import {NotificationsScreen} from './src/screens/NotificationsScreen';

import {getDocuments} from './src/services/requests';
import {storageService} from './src/utils/newstorage';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  async function apiCall() {
    if (!storageService.getDocumentsStorage()) {
      const reqData = await getDocuments();
      reqData &&
        reqData.length > 0 &&
        (await storageService.saveDocumentArray('documents', reqData));
      console.log('Existe ');
    }
  }

  useEffect(() => {
    apiCall();
  }, []);

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
