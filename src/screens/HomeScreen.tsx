/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
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

import {DocumentModel} from '../models/documentModel';

// import WebSocketService from '../services/webSoquet';

import {storageService} from '../utils/newstorage';
import {getDocuments} from '../services/requests';

export const HomeScreen: React.FC = () => {
  const [display, setDisplay] = useState('list');
  const [isVisible, setIsVisible] = useState(false);
  const [newFile, setNewFile] = useState<DocumentModel | null>(null);
  const [flatlistData, setFlatlistData] = useState<DocumentModel[]>([]);
  // const [messages, setMessages] = useState<String[]>([]);
  // const websocket = new WebSocketService();

  async function apiCall() {
    const storedDocuments = await storageService.getDocumentsArray('documents');
    console.log('Storage:', storedDocuments);

    if (!storedDocuments || storedDocuments.length === 0) {
      const fetchedDocuments = await getDocuments();

      if (fetchedDocuments?.length) {
        await storageService.saveDocumentArray('documents', fetchedDocuments);
        setFlatlistData(fetchedDocuments);
        console.log('Documentos guardados en el almacenamiento.');
      }
    } else {
      setFlatlistData(storedDocuments);
    }
  }

  function behaviorSlideUpCard(calledFrom: string) {
    if (calledFrom === 'slideUpCard') {
      setIsVisible(false);
      return;
    }
    setNewFile(null);
    setIsVisible(false);
  }

  useEffect(() => {
    apiCall();
  }, [isVisible]);

  return (
    <View style={styles.principalContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'red'} />
      {Platform.OS === 'ios' && (
        <View style={{backgroundColor: 'white', height: 70}} />
      )}

      <SafeAreaView style={styles.safeViewContainer}>
        {/* <TopBar notificationsAmount={messages.length} /> */}
        <TopBar />
        <View style={styles.viewContainer}>
          <View style={styles.orderViewContainer}>
            <Button
              title="clear"
              onPress={async () => {
                await storageService.clearDocumentsStorage();
                setIsVisible(false);
                console.log('LIMPADO');
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
          behaviorSlideUpCard={behaviorSlideUpCard}
          setNewFile={setNewFile}
        />
      )}
      <BottomButton
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        behaviorSlideUpCard={behaviorSlideUpCard}
        newFile={newFile}
      />
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
