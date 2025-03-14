import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {file1} from '../../mocks/file1';
import {file2} from '../../mocks/file2';
import {file3} from '../../mocks/file3';
import {Document} from '../../services/requests';

interface mockUpFileModalProps {
  modalVisible: boolean;
  setModalVisible: (arg0: Document) => void;
}

export const MockUpFileModal: React.FC<mockUpFileModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>This is a mock up modal and file</Text>
          <Text style={styles.modalText}>Select a file</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(file1)}>
              <Text style={styles.textStyle}>File 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(file2)}>
              <Text style={styles.textStyle}>File 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(file3)}>
              <Text style={styles.textStyle}>File 3</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  //   buttonOpen: {
  //     backgroundColor: '#F194FF',
  //   },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
