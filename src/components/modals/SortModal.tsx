import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface mockUpFileModalProps {
  sortModalVisible: boolean;
  showSortModal: (arg0: string) => void;
}

export const SortModal: React.FC<mockUpFileModalProps> = ({
  sortModalVisible,
  showSortModal,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={sortModalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Sort documents by date</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => showSortModal('Uploaded')}>
              <Text style={styles.textStyle}>Uploaded</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => showSortModal('Updated')}>
              <Text style={styles.textStyle}>Updated</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => showSortModal('Created')}>
              <Text style={styles.textStyle}>Created</Text>
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
    fontWeight: 'bold',
  },
});
