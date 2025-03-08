import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const TopBar = ({notificationAmount = 2}) => {
  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.textContainer}> */}
      <Text style={styles.textTitle}>Documents</Text>
      {/* </View> */}
      <View style={styles.iconContainer}>
        <Image
          source={require('../../assests/icons/bell.png')}
          style={styles.icon}
        />
      </View>
      {notificationAmount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{notificationAmount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
  },
  icon: {resizeMode: 'contain', width: 36, height: 36},
  textTitle: {
    fontSize: 36,
    fontWeight: 700,
  },
  //   textContainer: {
  //     position: 'absolute',
  //     left: 10,
  //   },
  iconContainer: {
    //   position: 'absolute',
    //   right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
    borderRadius: 10,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: 'grey',
  },
  badge: {
    position: 'absolute',
    top: '30%',
    right: '6%',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
