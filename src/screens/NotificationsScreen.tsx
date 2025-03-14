import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {NotificationModel} from '../models/notificationModel';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {formatDistanceToNow} from 'date-fns';

const DATA: NotificationModel[] = [
  {
    Timestamp: '2020-08-12T07:30:08.28093+02:00',
    UserID: '3ffe27e5-fe2c-45ea-8b3c-879b757b0455',
    UserName: 'Alicia Wolf',
    DocumentID: 'f09acc46-3875-4eff-8831-10ccf3356420',
    DocumentTitle: 'Edmund Fitzgerald Porter',
  },
  {
    Timestamp: '2020-08-12T07:30:08.281305+02:00',
    UserID: 'fd525a6d-1255-4427-91fa-86af21e805d3',
    UserName: 'Cindy Weissnat',
    DocumentID: '8d9b79cc-a48c-4f62-b385-607feb4276b8',
    DocumentTitle: 'Schneider Aventinus',
  },
  {
    Timestamp: '2020-08-12T07:30:11.284554+02:00',
    UserID: '8233841d-18b0-4f18-a1c1-9b9e8a8532e8',
    UserName: 'Otho Denesik',
    DocumentID: '7efbb4f3-2dfa-44ed-a7bf-a6fcd890f01d',
    DocumentTitle: 'Trappistes Rochefort 10',
  },
  {
    Timestamp: '2020-08-12T07:30:12.288571+02:00',
    UserID: '09c49420-99ab-4fd8-81ec-f83328f0d6e1',
    UserName: 'Cade Schumm',
    DocumentID: '77381dd5-15d8-4bfc-9981-31994ab8f7c3',
    DocumentTitle: 'Samuel Smith’s Imperial IPA',
  },
];

interface ItemProps {
  item: NotificationModel;
}

const getRelativeTime = (timestamp: string): string => {
  return formatDistanceToNow(new Date(timestamp), {addSuffix: true});
};

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
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={DATA}
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
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
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
    // paddingHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'white',
    width: '100%',
    // height: '10%',
    flexDirection: 'row',
  },
});
