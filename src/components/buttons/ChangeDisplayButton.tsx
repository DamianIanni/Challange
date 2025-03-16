import React, {useState} from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface customProps {
  changeDisplay: (arg0: string) => void;
}

export const ChangeDisplayButton: React.FC<customProps> = ({changeDisplay}) => {
  const [display, setDisplay] = useState(false);

  const onChangeDisplay = (state: boolean, type: string) => {
    setDisplay(state);
    changeDisplay(type);
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
    iconContainerGrid: {
      backgroundColor: display ? 'white' : Colors.lighter,
      width: '50%',
      height: '100%',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainerList: {
      backgroundColor: !display ? 'white' : Colors.lighter,
      width: '50%',
      height: '100%',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconGrid: {
      resizeMode: 'contain',
      height: 24,
      width: 24,
      tintColor: display ? '#007AFF' : 'lightgrey',
    },
    iconList: {
      resizeMode: 'contain',
      height: 24,
      width: 24,
      tintColor: !display ? '#007AFF' : 'lightgrey',
    },
  });

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.iconContainerList}
        onPress={() => onChangeDisplay(false, 'list')}>
        <Image
          style={styles.iconList}
          source={require('../../assests/icons/list.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainerGrid}
        onPress={() => onChangeDisplay(true, 'grid')}>
        <Image
          style={styles.iconGrid}
          source={require('../../assests/icons/grid.png')}
        />
      </TouchableOpacity>
    </View>
  );
};
