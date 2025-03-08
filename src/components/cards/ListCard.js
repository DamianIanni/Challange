import {View, Text, Image, StyleSheet} from 'react-native';

export const ListCard = item => {
  console.log('propse', item.item);

  //   const {data. }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text>llala</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    padding: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 10,
    // width: '100%'
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  // titleColumnOneContainer: {
  //     flexDirection: "row",
  //     justifyContent: "flex-start",
  //     alignItems: "center"
  // }
  column: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
  },
  titleCard: {
    fontWeight: 700,
    fontSize: 16,
  },
  titleColumn: {
    fontWeight: 700,
    fontSize: 12,
  },
  text: {
    color: 'lightgrey',
    fontSize: 10,
  },
});
