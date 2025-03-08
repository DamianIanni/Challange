import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export const BottomButton = () => {
  const [addDocument, setAddDocument] = useState(false);

  const txt = addDocument ? 'Submit' : '+ Add document';
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.touchableOpacityContainer}
        onPress={() => setAddDocument(!addDocument)}>
        {/* <View style={styles.textContainer}> */}
        <Text style={styles.textTitle}>{txt}</Text>
        {/* </View> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 10,
  },
  mainContainer: {
    width: '120%',
    height: 100,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'lightgrey',
    borderTopWidth: 2,
    position: 'absolute',
    bottom: 0,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '80%',
    color: 'white',
    textAlign: 'center',
  },
});
