import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const BottomButton = ({setIsVisible, isVisible}) => {
  function buttonTouched() {
    setIsVisible(true);
  }

  const txt = isVisible ? 'Submit' : '+ Add document';
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.touchableOpacityContainer}
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
