import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export const SlideUpCard = ({isVisible, setIsVisible}) => {
  const slideAnim = useState(new Animated.Value(1))[0]; // Inicia en 1 (oculto)

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : 1, // 0 = visible, 1 = oculto
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible, slideAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedView,
          // {
          //   transform: [
          //     {
          //       translateY: slideAnim.interpolate({
          //         inputRange: [0, 1],
          //         outputRange: [0, '100%'], // 100% de la altura cuando está oculto
          //       }),
          //     },
          //   ],
          // },
        ]}>
        <View style={styles.firstRowContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.textTitle}>Add document</Text>
          </View>
          {/* <TouchableOpacity title="X" onPress={() => setIsVisible(false)} /> */}
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setIsVisible(false)}>
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
          <TouchableOpacity style={styles.fileButton}>
            <Image
              source={require('../../assests/icons/doc.png')}
              style={{width: 24, height: 24}}
              tintColor={'#007AFF'}
            />
            <Text
              style={[styles.textSubTitle, {color: '#007AFF', fontSize: 14}]}>
              Choose file
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
    backgroundColor: '#00000033',
    justifyContent: 'flex-end',
  },
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
    alignContent: 'center',
    // backgroundColor: 'red',
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  titleContainer: {alignItems: 'center', justifyContent: 'center'},
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
    // backgroundColor: 'blue',
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
    // backgroundColor: 'blue',
    textAlign: 'center',
  },
  textSubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    // backgroundColor: 'blue',
    textAlign: 'center',
  },
  rowsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 5,
    width: '100%',
    // height: 60
  },
  fileButton: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 130,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: '2%',
  },
  textInput: {
    height: '100%',
    // width: '100%',
    paddingHorizontal: '2.5%',
  },
  textInputContainer: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 45,
    width: '100%',
    // backgroundColor: 'red',
  },
  // icon: {
  //   resizeMode: "contain",
  //   width: 24,
  //   height: 24
  // }
});
