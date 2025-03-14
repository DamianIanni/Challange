import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  SafeAreaView,
  Platform,
  FlatList,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {TopBar} from '../components/topBar/TopBar';
import {BottomButton} from '../components/buttons/BottomButon';
import {ChangeDisplayButton} from '../components/buttons/ChangeDisplayButton';
import {SortButton} from '../components/buttons/SortButton';
import {ListCard} from '../components/cards/ListCard';
import {GridCard} from '../components/cards/GridCard';
import {SlideUpCard} from '../components/cards/SlideUpCard';
import {getDocuments} from '../services/requests';
import WebSocketService from '../services/webSoquet';

export const HomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [display, setDisplay] = useState('list');
  const [isVisible, setIsVisible] = useState(false);
  const [flatlistData, setFlatlistData] = useState([]);
  // const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const websocket = new WebSocketService();

  function closeSlideUpCard() {
    setIsVisible(false);
  }

  async function apiCall() {
    const reqData = await getDocuments();
    if (reqData !== null) {
      setFlatlistData(reqData);
    }
  }

  useEffect(() => {
    // Evitar que el WebSocket se conecte nuevamente si ya está conectado
    if (!websocket.isConnected) {
      websocket.connect();
    }

    // Actualizar el estado con los mensajes recibidos
    const interval = setInterval(() => {
      setMessages(websocket.getMessages());
    }, 1000);

    const timeout = setTimeout(() => {
      // Cerrar el WebSocket después de 3 segundos
      websocket.close();
      clearInterval(interval);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      websocket.close(); // Asegurarse de que se cierre el WebSocket al desmontar
    };
  }, []);

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
        <TopBar notificationsAmount={messages.length} />
        <View style={styles.viewContainer}>
          <View style={styles.orderViewContainer}>
            <Button
              title="call"
              onPress={() => {
                apiCall();
              }}
            />
            <Button
              title="close"
              onPress={() => {
                websocket.close();
                console.log('CERRADo');
              }}
            />
            <SortButton />
            <ChangeDisplayButton changeDisplay={setDisplay} />
          </View>
          <View style={styles.flatlistContainer}>
            {display === 'list' ? (
              <FlatList
                data={flatlistData}
                key={display}
                renderItem={props => <ListCard data={props.item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatlistStyle}
              />
            ) : (
              <FlatList
                data={flatlistData}
                key={display}
                renderItem={props => <GridCard data={props.item} />}
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
        <SlideUpCard
          isVisible={isVisible}
          closeSlideUpCard={closeSlideUpCard}
        />
      )}
      <BottomButton isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  );
};

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
