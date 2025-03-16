import {View, Text, StyleSheet} from 'react-native';
import {DocumentModel} from '../../models/documentModel';

interface CustomProps {
  data: DocumentModel;
}

export const GridCard: React.FC<CustomProps> = ({data}) => {
  const {Version, Title, CreatedAt, UpdatedAt} = data;
  return (
    <View style={styles.mainContainer}>
      <Text numberOfLines={1} style={styles.titleCard}>
        {Title}
      </Text>
      <Text style={styles.text}>Version {Version}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '47.5%',
    // flex: 1,
    // marginHorizontal: '5%',
    marginVertical: '2.5%',
    height: 100,
    padding: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    // marginVertical: '2%',
    borderRadius: 10,
    gap: '20%',
    // width: '100%'
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
  },
  text: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 500,
  },
});
