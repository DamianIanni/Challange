import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
// import {Document} from '../../services/requests.ts';
import {DocumentModel} from '../../models/documentModel.ts';
import {MockUpFileModal} from '../modals/MockUpFileModal.tsx';

interface slideUpCardProps {
  isVisible: boolean;
  closeSlideUpCard: () => void;
}

export const SlideUpCard: React.FC<slideUpCardProps> = ({
  isVisible,
  closeSlideUpCard,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [fileSelected, setFileSelected] = useState<DocumentModel | null>(null);
  const slideAnim = useRef(new Animated.Value(300)).current;

  function showModal(file: DocumentModel) {
    setFileSelected(file);
    setModalVisible(!modalVisible);
  }

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : 0.3,
      duration: 300,
      useNativeDriver: true,
    }).start();
  });

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.overlay}
        onPress={() => setIsVisible(false)}
      /> */}
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [{translateY: slideAnim}],
          },
        ]}>
        <MockUpFileModal
          modalVisible={modalVisible}
          setModalVisible={showModal}
        />
        <View style={styles.firstRowContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.textTitle}>Add document</Text>
          </View>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => closeSlideUpCard()}>
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
            <TextInput placeholder="Placeholder" style={styles.textInput} />
          </View>
        </View>
        <View style={styles.rowsContainer}>
          <Text style={styles.textSubTitle}>Version</Text>
          <View style={styles.textInputContainer}>
            <TextInput placeholder="Placeholder" style={styles.textInput} />
          </View>
        </View>
        <View style={styles.rowsContainer}>
          <Text style={styles.textSubTitle}>File</Text>
          <TouchableOpacity
            style={styles.fileButton}
            onPress={() => setModalVisible(true)}>
            <Image
              source={require('../../assests/icons/doc.png')}
              style={{width: 24, height: 24}}
              tintColor={'#007AFF'}
            />
            <Text
              style={[styles.textSubTitle, {color: '#007AFF', fontSize: 14}]}>
              {fileSelected ? fileSelected.Title : 'Choose file'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  // overlay: {
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  // },
  animatedView: {
    height: '50%',
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
