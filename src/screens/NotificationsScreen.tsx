import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {NotificationModel} from '../models/notificationModel';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {storageService} from '../storage/newstorage';
import {getRelativeTime} from '../utils/formatDateUtil';

interface ItemProps {
  item: NotificationModel;
}

const Item: React.FC<ItemProps> = ({item}) => {
  return (
    <View style={styles.mainItemContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.userName}>{item.UserName}</Text>
        <Text style={styles.timestamp}>{getRelativeTime(item.Timestamp)}</Text>
      </View>
      <Text style={styles.documentTitle}>{item.DocumentTitle}</Text>
    </View>
  );
};

export const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);

  async function getNotifi() {
    const notificationsInStorage = await storageService.getNotificationsArray(
      'notifications',
    );
    setNotifications(notificationsInStorage?.reverse() || []);
  }

  useEffect(() => {
    getNotifi();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.DocumentID}
        renderItem={({item}) => <Item item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.lighter,
    // gap: 40,
  },
  mainItemContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    gap: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  documentTitle: {
    fontSize: 14,
    color: 'gray',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
  },
  flatlistStyle: {
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
});
