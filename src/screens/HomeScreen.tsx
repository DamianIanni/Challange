/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Alert,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {TopBar} from '../components/topBar/TopBar';
import {BottomButton} from '../components/buttons/BottomButon';
import {ChangeDisplayButton} from '../components/buttons/ChangeDisplayButton';
import {SortButton} from '../components/buttons/SortButton';
import {SlideUpCard} from '../components/cards/SlideUpCard';
import {FlatListComponent} from '../components/cards/FlatLitComponent';
import {CustomToast} from '../components/modals/CustomToast';
import {SortModal} from '../components/modals/SortModal';

import {DocumentModel} from '../models/documentModel';

import {storageService} from '../storage/newstorage';
import {getDocuments} from '../services/requests';
import {sortDataUtil, sortDataUtilUpdated} from '../utils/sortDataUtil';

export const HomeScreen: React.FC = () => {
  const [display, setDisplay] = useState<string>('list');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [newFile, setNewFile] = useState<DocumentModel | null>(null);
  const [flatlistData, setFlatlistData] = useState<DocumentModel[]>([]);
  const [isStorageCleaned, setIsStorageCleaned] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [flatlistDataSorted, setFlatlistDataSorted] = useState<DocumentModel[]>(
    [],
  );
  const [flatlistDataSortedUpdated, setFlatlistDataSortedUpdated] = useState<
    DocumentModel[]
  >([]);
  const [sortModalVisible, setSortModalVisible] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('Uploaded');

  const showSortModal = (sorted: string) => {
    setSortModalVisible(false);
    setSortBy(sorted);
  };

  function whichWayToSort() {
    switch (sortBy) {
      case 'Created':
        return flatlistDataSorted;
      case 'Updated':
        return flatlistDataSortedUpdated;
      default:
        return flatlistData;
    }
  }

  async function updateFlatlistData() {
    const storedDocuments = await storageService.getDocumentsArray('documents');
    setFlatlistDataSorted(sortDataUtil(storedDocuments));
    setFlatlistDataSortedUpdated(sortDataUtilUpdated(storedDocuments));
    setFlatlistData(storedDocuments);
    setRefreshing(false);
  }

  async function apiCall() {
    try {
      const storedDocuments = await storageService.getDocumentsArray(
        'documents',
      );
      const fetchedDocuments = await getDocuments();
      if (fetchedDocuments === null) {
        setRefreshing(false);
        throw new Error('Ups, something went wrong, try again later');
      }

      if (storedDocuments && fetchedDocuments) {
        await storageService.pushDocumentArray('documents', fetchedDocuments);
        await updateFlatlistData();
      } else if (!storedDocuments && fetchedDocuments) {
        await storageService.saveDocumentArray('documents', fetchedDocuments);
        setFlatlistData(fetchedDocuments);
        setFlatlistDataSorted(sortDataUtil(fetchedDocuments));
        setFlatlistDataSortedUpdated(sortDataUtilUpdated(fetchedDocuments));
        setRefreshing(false);
      }

      return true;
    } catch (error) {
      setRefreshing(false);

      console.error('Error fetching documents:', error);
      Alert.alert('Ups, something went wrong, try again later');
      return false;
    }
  }

  async function callOnRefresh() {
    setRefreshing(true);
    await apiCall();
    setRefreshing(false);
  }

  function behaviorSlideUpCard(calledFrom: string) {
    if (calledFrom === 'slideUpCard') {
      setIsVisible(false);
      return;
    }
    updateFlatlistData();
    setIsVisible(false);
    setToastVisible(true);
  }

  useEffect(() => {}, [isVisible, newFile, sortBy]);

  useEffect(() => {
    apiCall();
  }, [isStorageCleaned]);

  return (
    <View style={styles.principalContainer}>
      <StatusBar barStyle={'dark-content'} />

      <SafeAreaView style={styles.safeViewContainer}>
        <SortModal
          sortModalVisible={sortModalVisible}
          showSortModal={showSortModal}
        />
        <TopBar />
        <View style={styles.viewContainer}>
          <View style={styles.orderViewContainer}>
            <SortButton sortModalVisible={() => setSortModalVisible(true)} />
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
            data={whichWayToSort()}
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
          // isVisible={isVisible}
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
