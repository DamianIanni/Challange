/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import type {PropsWithChildren} from 'react';
import {
  // ScrollView,
  StatusBar,
  StyleSheet,
  // Text,
  useColorScheme,
  View,
  SafeAreaView,
  Platform,
  FlatList,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {TopBar} from './src/components/topBar/TopBar';
import {BottomButton} from './src/components/buttons/BottomButon';
import {ChangeDisplayButton} from './src/components/buttons/ChangeDisplayButton';
import {SortButton} from './src/components/buttons/SortButton';
import {ListCard} from './src/components/cards/ListCard';

const data = [
  {
    Attachments: ['European Amber Lager', 'Wood-aged Beer'],
    Contributors: [
      {
        ID: '1b41861e-51e2-4bf4-ba13-b20f01ce81ef',
        Name: 'Jasen Crona',
      },
      {
        ID: '2a1d6ed0-7d2d-4dc6-b3ea-436a38fd409e',
        Name: 'Candace Jaskolski',
      },
      {
        ID: '9ae28565-4a1c-42e3-9ae8-e39e6f783e14',
        Name: 'Rosemarie Schaden',
      },
    ],
    CreatedAt: '1912-03-08T06:01:39.382278739Z',
    ID: '69517c79-a4b2-4f64-9c83-20e5678e4519',
    Title: 'Arrogant Bastard Ale',
    UpdatedAt: '1952-02-29T22:21:13.817038244Z',
    Version: '5.3.15',
  },
  {
    Attachments: ['Strong Ale', 'Stout', 'Dark Lager', 'Belgian Strong Ale'],
    Contributors: [
      {
        ID: '1bbb6853-390f-49aa-a002-fb60908f8b0e',
        Name: 'Hermann Lowe',
      },
    ],
    CreatedAt: '1993-11-12T00:55:44.438198299Z',
    ID: 'd7e00994-75e6-48f1-b778-e5d31ead7136',
    Title: 'Ten FIDY',
    UpdatedAt: '1946-04-15T06:09:44.564202073Z',
    Version: '5.1.15',
  },
  {
    Attachments: [
      'Bock',
      'English Pale Ale',
      'Wood-aged Beer',
      'Belgian And French Ale',
    ],
    Contributors: [
      {
        ID: 'de30f704-1102-40f4-8517-a0361378370c',
        Name: 'Velda Watsica',
      },
      {
        ID: 'f65b8ce0-1276-4a07-899c-a41387c9360c',
        Name: 'Helmer Hauck',
      },
    ],
    CreatedAt: '2007-12-11T02:35:33.701912202Z',
    ID: 'fe6ad6ed-a5bd-480b-8688-fd3652b2a6d9',
    Title: 'Orval Trappist Ale',
    UpdatedAt: '1972-01-02T13:12:29.948799707Z',
    Version: '1.3.1',
  },
];

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const safePadding = '10%';s

  return (
    <View style={{flex: 1, backgroundColor: backgroundStyle.backgroundColor}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'red'}
      />
      {Platform.OS === 'ios' && (
        <View style={{backgroundColor: 'white', height: 70}} />
      )}

      <SafeAreaView style={styles.safeViewContainer}>
        <TopBar />
        <View style={styles.viewContainer}>
          <View style={styles.orderViewContainer}>
            <SortButton />
            <ChangeDisplayButton />
          </View>
          <View>
            <FlatList
              data={data}
              renderItem={props => <ListCard item={props.item} />}
              keyExtractor={item => item.ID}
            />
          </View>
          <BottomButton />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: '5%',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: Colors.lighter,
    height: '100%',
    alignItems: 'center',
  },
  safeViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'column',
    // paddingTop: 70,
  },
  orderViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    // padding: '5%',
    width: '100%',
  },
});

export default App;
