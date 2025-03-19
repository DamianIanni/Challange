/* eslint-disable react-native/no-inline-styles */
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  ScrollView,
} from 'react-native';
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
  console.log('LA DATA', data);

  return (
    <View style={styles.flatlistContainer}>
      {(!data || data.length === 0) && (
        <ScrollView
          contentContainerStyle={styles.noDataContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => callOnrefresh()}
            />
          }>
          <Text style={{fontWeight: 'bold'}}>Pull down to refresh</Text>
        </ScrollView>
        // <View style={styles.noDataContainer}
        // >
        // </View>
      )}
      {data.length > 0 && display === 'list' ? (
        <FlatList
          data={data}
          key={1}
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
          key={2}
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
  noDataContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
