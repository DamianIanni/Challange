import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {ListCard} from './ListCard';
import {GridCard} from './GridCard';
import {DocumentModel} from '../../models/documentModel';

interface customProps {
  data: DocumentModel[];
  display: string;
  callOnrefresh: () => void;
  refreshing: boolean;
}

export const FlatListComponent: React.FC<customProps> = ({
  display,
  data,
  callOnrefresh,
  refreshing,
}) => {
  return (
    <View style={styles.flatlistContainer}>
      {display === 'list' ? (
        <FlatList
          data={data}
          key={display}
          renderItem={props => <ListCard data={props.item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlistStyle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={callOnrefresh} />
          }
        />
      ) : (
        <FlatList
          data={data}
          key={display}
          renderItem={props => <GridCard data={props.item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlistStyle}
          columnWrapperStyle={styles.row}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={callOnrefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    width: '100%',
    height: '100%',
  },
  flatlistStyle: {
    paddingBottom: '15%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  row: {
    justifyContent: 'space-between',
  },
});
