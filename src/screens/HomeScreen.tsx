import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, View, SafeAreaView, Button} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {TopBar} from '../components/topBar/TopBar';
import {BottomButton} from '../components/buttons/BottomButon';
import {ChangeDisplayButton} from '../components/buttons/ChangeDisplayButton';
import {SortButton} from '../components/buttons/SortButton';
import {SlideUpCard} from '../components/cards/SlideUpCard';
import {FlatListComponent} from '../components/cards/FlatLitComponent';
import {CustomToast} from '../components/modals/CustomToast';

import {DocumentModel} from '../models/documentModel';

import {storageService} from '../storage/newstorage';
import {getDocuments} from '../services/requests';

export const HomeScreen: React.FC = () => {
  const [display, setDisplay] = useState<string>('list');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [newFile, setNewFile] = useState<DocumentModel | null>(null);
  const [flatlistData, setFlatlistData] = useState<DocumentModel[]>([]);
  const [isStorageCleaned, setIsStorageCleaned] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);

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

  async function callOnRefresh() {
    setRefreshing(true);
    console.log('CALLING');

    await apiCall();
    console.log('CALLING 2');

    setRefreshing(false);
  }

  function behaviorSlideUpCard(calledFrom: string) {
    if (calledFrom === 'slideUpCard') {
      setIsVisible(false);
      return;
    }
    setToastVisible(true);
    setIsVisible(false);
  }

  useEffect(() => {
    apiCall();
  }, [isVisible, isStorageCleaned, newFile]);

  return (
    <View style={styles.principalContainer}>
      <StatusBar barStyle={'dark-content'} />

      <SafeAreaView style={styles.safeViewContainer}>
        <TopBar />
        <View style={styles.viewContainer}>
          <View style={styles.orderViewContainer}>
            <SortButton />
            <Button
              title="clear"
              onPress={async () => {
                await storageService.clearDocumentsStorage();
                setIsStorageCleaned(!isStorageCleaned);
                console.log('LIMPADO');
              }}
            />
            <ChangeDisplayButton changeDisplay={setDisplay} />
          </View>
          <FlatListComponent
            display={display}
            data={flatlistData}
            callOnrefresh={callOnRefresh}
            refreshing={refreshing}
          />
        </View>
        <CustomToast
          message={newFile?.Title}
          visible={toastVisible}
          onHide={() => {
            setToastVisible(false);
            setNewFile(null);
          }}
        />
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
    backgroundColor: 'white',
  },
  row: {
    justifyContent: 'space-between',
  },
  flatlistContainer: {
    width: '100%',
    height: '100%',
  },
  flatlistStyle: {
    paddingBottom: '15%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },

  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: Colors.lighter,
    alignItems: 'center',
  },
  safeViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
