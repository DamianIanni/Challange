import React, {useEffect} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

interface TopBarProps {
  notificationsAmount: number;
}

export const TopBar: React.FC<TopBarProps> = ({notificationsAmount}) => {
  // useEffect(() => {}, []);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textTitle}>Documents</Text>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../assests/icons/bell.png')}
          style={styles.icon}
        />
      </View>
      {notificationsAmount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {notificationsAmount < 100 ? notificationsAmount : '99'}
          </Text>
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
  iconContainer: {
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
    right: '7%',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
