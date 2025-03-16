/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DocumentModel} from '../../models/documentModel';
import {storageService} from '../../utils/newstorage';

interface customProps {
  setIsVisible: (arg0: boolean) => void;
  isVisible: boolean;
  newFile: DocumentModel | null;
  behaviorSlideUpCard: (arg0: string) => void;
}

export const BottomButton: React.FC<customProps> = ({
  setIsVisible,
  isVisible,
  newFile,
  behaviorSlideUpCard,
}) => {
  const txt = isVisible ? 'Submit' : '+ Add document';
  async function buttonTouched() {
    if (newFile !== null && isVisible) {
      await storageService.pushNewDocument('documents', newFile);
      behaviorSlideUpCard('button');
      return;
    }
    setIsVisible(true);
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        disabled={newFile === null && isVisible}
        style={[
          styles.touchableOpacityContainer,
          {
            backgroundColor:
              newFile === null && isVisible ? 'lightgrey' : '#007AFF',
          },
        ]}
        onPress={() => buttonTouched()}>
        <Text style={styles.textTitle}>{txt}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.lighter,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'lightgrey',
    borderTopWidth: 2,
    // position: 'absolute',
    bottom: 0,
    // paddingTop: 20,
  },
  touchableOpacityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '80%',
    color: 'white',
    textAlign: 'center',
  },
});
