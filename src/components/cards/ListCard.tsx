/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {DocumentModel} from '../../models/documentModel';
import {getRelativeTime} from '../../utils/formatDateUtil';
import {callOnShare} from '../../utils/shareDocumentUtil';

interface ListCardProps {
  data: DocumentModel;
}

export const ListCard: React.FC<ListCardProps> = ({data}) => {
  const {Version, Title, Contributors, Attachments, CreatedAt} = data;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={styles.titleCard}>
          {Title}
        </Text>
        <Text style={styles.text}>Version {Version}</Text>
      </View>
      <View style={styles.columnsContainer}>
        <View style={styles.column}>
          <View style={styles.titleContainer}>
            <Image
              source={require('../../assests/icons/group.png')}
              style={styles.icon}
              tintColor={'grey'}
            />
            <Text style={styles.titleColumn}>Contributors</Text>
          </View>
          {Contributors.map((element, index) => {
            return (
              <Text key={index} style={styles.text}>
                {element.Name}
              </Text>
            );
          })}
        </View>
        <View style={styles.column}>
          <View style={styles.titleContainer}>
            <Image
              source={require('../../assests/icons/attach.png')}
              style={styles.icon}
            />
            <Text style={styles.titleColumn}>Attachments</Text>
          </View>
          {Attachments.map((element, index) => {
            return (
              <Text numberOfLines={1} key={index} style={styles.text}>
                {element}
              </Text>
            );
          })}
        </View>
      </View>
      <View
        style={[
          styles.titleContainer,
          {justifyContent: 'space-between', marginTop: '5%'},
        ]}>
        <Text numberOfLines={1} style={styles.text}>
          {`Created ${getRelativeTime(CreatedAt)}`}
        </Text>
        <TouchableOpacity
          style={styles.iconShareContainer}
          onPress={() => callOnShare(data)}>
          <Image
            source={require('../../assests/icons/share.png')}
            style={styles.icon}
            tintColor={'grey'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    padding: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: '2.5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '5%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },

  column: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '45%',
    gap: 4,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
    tintColor: 'grey',
  },
  titleCard: {
    fontWeight: 700,
    fontSize: 18,
    maxWidth: '60%',
  },
  titleColumn: {
    fontWeight: 700,
    fontSize: 14,
  },
  text: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 500,
  },
  iconShareContainer: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
