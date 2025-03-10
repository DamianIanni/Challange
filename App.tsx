/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
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
  Animated,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {TopBar} from './src/components/topBar/TopBar';
import {BottomButton} from './src/components/buttons/BottomButon';
import {ChangeDisplayButton} from './src/components/buttons/ChangeDisplayButton';
import {SortButton} from './src/components/buttons/SortButton';
import {ListCard} from './src/components/cards/ListCard';
import {GridCard} from './src/components/cards/GridCard';
import {SlideUpCard} from './src/components/cards/SlideUpCard';

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
    ID: 'fe6ad6aed-a5bd-480b-8688-fd3652bsa6d9',
    Title: 'Orval Trappist Ale',
    UpdatedAt: '1972-01-02T13:12:29.948799707Z',
    Version: '1.3.1',
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
    ID: 'fe6ad6ed-ewa5bd-480b-8688-fd3252b2a6d9',
    Title: 'Orval Trappist Ale',
    UpdatedAt: '1972-01-02T13:12:29.948799707Z',
    Version: '1.3.1',
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
    ID: 'fe6ad6ed-a5bd-422380b-86f88-fd3652b2a6d9',
    Title: 'Orval Trappist Ale',
    UpdatedAt: '1972-01-02T13:12:29.948799707Z',
    Version: '1.3.1',
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
    ID: 'fe6ad6ed-a5bd-48g0b-8688-fd323652b2a6d9',
    Title: 'Orval Trappist Ale',
    UpdatedAt: '1972-01-02T13:12:29.948799707Z',
    Version: '1.3.1',
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
    ID: 'fe6ad6ed-a5bd-480b-86a88-fd3652b2ga6d9',
    Title: 'Orval Trappist Ale',
    UpdatedAt: '1972-01-02T13:12:29.948799707Z',
    Version: '1.3.1',
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
    ID: 'fe6ad6ed-a5bd-480b-86885-fd3652sadb2a6d9',
    Title: 'Orval Trappist Ale',
    UpdatedAt: '1972-01-02T13:12:29.948799707Z',
    Version: '1.3.1',
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
    ID: 'fe6ad6ed-a5bd-480kb-86llf88-fd3652b2a6d9',
    Title: 'Orval Trappist Ale',
    UpdatedAt: '1972-01-02T13:12:29.948799707Z',
    Version: '1.3.1',
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
    ID: 'fe6ad6ed-a5bd-48vasdf0b-8688-fd3652b2a6d9',
    Title: 'Orval Trappist Ale',
    UpdatedAt: '1972-01-02T13:12:29.948799707Z',
    Version: '1.3.1',
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
    ID: 'fe6aasd6ed-a5bd-4s80b-8688-fd3652b2a6d9',
    Title: 'Orval Trappist Ale',
    UpdatedAt: '1972-01-02T13:12:29.948799707Z',
    Version: '1.3.1',
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
    ID: 'fe6qad6ed-a5bd-48g0b-8688-fd3652b2a6d9',
    Title: 'Orval Trappist Ale',
    UpdatedAt: '1972-01-02T13:12:29.948799707Z',
    Version: '1.3.1',
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
    ID: 'fe6ad6sdaed-a5bd-4c80b-8688-fd3652b2a6d9',
    Title: 'Orval Trappist Ale',
    UpdatedAt: '1972-01-02T13:12:29.948799707Z',
    Version: '1.3.1',
  },
];

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [display, setDisplay] = useState('list');
  const [isVisible, setIsVisible] = useState(false);

  const slideAnim = useState(new Animated.Value(1))[0]; // Inicia en 1 (oculto)

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : 1, // 0 = visible, 1 = oculto
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible, slideAnim]);
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  // const flatlistStyle = {
  //   paddingBottom:  '20%',
  //   // paddingTop: '2.5%',
  //   paddingHorizontal: '5%',
  //   justifyContent: 'space-between',
  //   // alignItems: 'center',
  //   // backgroundColor: 'blue',
  // };

  // const safePadding = '10%';s

  return (
    <View style={styles.principalContainer}>
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
            <ChangeDisplayButton changeDisplay={setDisplay} />
          </View>
          <View style={styles.flatlistContainer}>
            {display === 'list' ? (
              <FlatList
                data={data}
                key={display}
                renderItem={props => <ListCard data={props.item} />}
                keyExtractor={item => item.ID}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatlistStyle}
              />
            ) : (
              <FlatList
                data={data}
                key={display}
                renderItem={props => <GridCard data={props.item} />}
                keyExtractor={item => item.ID}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatlistStyle}
                columnWrapperStyle={styles.row}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
      {isVisible && (
        <SlideUpCard isVisible={isVisible} setIsVisible={setIsVisible} />
      )}
      <BottomButton isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  principalContainer: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  row: {
    justifyContent: 'space-between',
  },
  flatlistContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    // alignContent: 'space-between',
  },
  flatlistStyle: {
    paddingBottom: '15%',
    // paddingTop: '2.5%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: 'blue',
  },

  viewContainer: {
    flex: 1,
    // paddingHorizontal: '5%',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: Colors.lighter,
    // height: '100%',
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
    height: 60,
    paddingHorizontal: '5%',
    width: '100%',
  },
});

export default App;
