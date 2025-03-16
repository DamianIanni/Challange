import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text} from 'react-native';

export const SortButton = () => {
  //   const [display, setDisplay] = useState(false);

  return (
    <TouchableOpacity style={styles.mainContainer}>
      <View
        style={styles.textContainer}
        // onPress={() => setDisplay(false)}
      >
        <Image
          style={styles.iconSortBy}
          source={require('../../assests/icons/sort_by.png')}
        />
        <Text style={styles.text}>Sort by</Text>
      </View>
      <View
        style={styles.iconContainer}
        // onPress={() => setDisplay(true)}
      >
        <Image
          style={styles.iconArrow}
          source={require('../../assests/icons/arrow_down.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    borderStyle: 'solid',
  },
  textContainer: {
    backgroundColor: 'white',
    width: '70%',
    height: '100%',
    borderRightColor: 'lightgrey',
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    //   gap:
  },
  iconContainer: {
    backgroundColor: 'white',
    width: '30%',
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconArrow: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
    tintColor: 'black',
  },
  iconSortBy: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
    transform: [{rotate: '90deg'}],
  },
  text: {
    fontWeight: 700,
  },
});
