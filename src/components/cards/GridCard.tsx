import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {DocumentModel} from '../../models/documentModel';
import {getRelativeTime} from '../../utils/formatDateUtil';
import {callOnShare} from '../../utils/shareDocumentUtil';

interface CustomProps {
  data: DocumentModel;
}

export const GridCard: React.FC<CustomProps> = ({data}) => {
  const {Version, Title, CreatedAt} = data;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={styles.titleCard}>
          {Title}
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
      <Text style={styles.text}>Version {Version}</Text>
      <Text numberOfLines={1} style={styles.text}>
        {getRelativeTime(CreatedAt)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '47.5%',
    marginVertical: '2.5%',
    height: 100,
    padding: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 10,
    gap: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  titleCard: {
    fontWeight: 700,
    fontSize: 18,
    width: '80%',
  },
  text: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 500,
  },
  iconShareContainer: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  icon: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
    tintColor: 'grey',
  },
});
