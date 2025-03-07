/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  SafeAreaView,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const safePadding = '5%';

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <SafeAreaView style={styles.safeViewContainer}>
        <View style={styles.viewContainer}>
          <Text>LLEIDA</Text>
        </View>
      </SafeAreaView>
      {/* <ScrollView style={backgroundStyle}></ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: '4%',
  },
  safeViewContainer: {flex: 1, alignItems: 'center'},
});

export default App;
