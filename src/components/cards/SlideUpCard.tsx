/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {DocumentModel} from '../../models/documentModel.ts';
import {MockUpFileModal} from '../modals/MockUpFileModal.tsx';

interface slideUpCardProps {
  isVisible: boolean;
  behaviorSlideUpCard: (arg0: string) => void;
  setNewFile: (arg0: DocumentModel) => void;
}

export const SlideUpCard: React.FC<slideUpCardProps> = ({
  isVisible,
  behaviorSlideUpCard,
  setNewFile,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [fileSelected, setFileSelected] = useState<DocumentModel | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileVersion, setFileVersion] = useState<string>('');
  const slideAnim = useRef(new Animated.Value(300)).current;

  function showModal(file: DocumentModel) {
    const modifiedFile = {...file, Title: fileName, Version: fileVersion};

    setFileSelected(file);
    setNewFile(modifiedFile);
    setModalVisible(!modalVisible);
  }

  function onChangeFileName(text: string) {
    setFileName(text);
  }

  function onChangeFileVersion(text: string) {
    setFileVersion(text);
  }

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : 0.3,
      duration: 300,
      useNativeDriver: true,
    }).start();
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <Animated.View
            style={[
              styles.animatedView,
              {
                transform: [{translateY: slideAnim}],
              },
            ]}>
            <MockUpFileModal
              modalVisible={modalVisible}
              showModal={showModal}
            />
            <View style={styles.firstRowContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.textTitle}>Add document</Text>
              </View>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => behaviorSlideUpCard('slideUpCard')}>
                <Image
                  style={styles.icon}
                  source={require('../../assests/icons/close.png')}
                  tintColor={'grey'}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.textSubTitle}>Document informations</Text>
            <View style={styles.rowsContainer}>
              <Text style={styles.textSubTitle}>Name</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="Document Name"
                  value={fileName}
                  style={styles.textInput}
                  onChange={e => onChangeFileName(e.nativeEvent.text)}
                />
              </View>
            </View>
            <View style={styles.rowsContainer}>
              <Text style={styles.textSubTitle}>Version</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="Document Version"
                  value={fileVersion}
                  style={styles.textInput}
                  onChange={e => onChangeFileVersion(e.nativeEvent.text)}
                />
              </View>
            </View>
            <View style={styles.rowsContainer}>
              <Text style={styles.textSubTitle}>File</Text>
              <TouchableOpacity
                disabled={fileName !== '' && fileVersion !== '' ? false : true}
                style={styles.fileButton}
                onPress={() => setModalVisible(true)}>
                <Image
                  source={require('../../assests/icons/doc.png')}
                  style={{width: 24, height: 24}}
                  tintColor={
                    fileName !== '' && fileVersion !== ''
                      ? '#007AFF'
                      : 'lightgrey'
                  }
                />
                <Text
                  style={[
                    styles.textSubTitle,
                    {
                      color:
                        fileName !== '' && fileVersion !== ''
                          ? '#007AFF'
                          : 'lightgrey',
                      fontSize: 14,
                    },
                  ]}>
                  {fileSelected ? fileSelected.Title : 'Choose file'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  animatedViewContainer: {height: '100%'},
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  animatedView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '5%',
    gap: '3%',
  },
  firstRowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  titleContainer: {alignItems: 'center', justifyContent: 'center'},
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
  },
  icon: {
    resizeMode: 'contain',
    width: 36,
    height: 36,
    tintColor: 'grey',
  },
  textTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rowsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 5,
    width: '100%',
  },
  fileButton: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: '2%',
  },
  textInput: {
    height: '100%',
    paddingHorizontal: '2.5%',
  },
  textInputContainer: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 45,
    width: '100%',
  },
});
