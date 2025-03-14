import {View, Text, Image, StyleSheet} from 'react-native';

export const ListCard = data => {
  const {Version, ID, Title, Contributors, Attachments, CreatedAt, UpdatedAt} =
    data.data;

  // console.log('propse', Attachments);

  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={styles.titleCard}>
          {Title}
        </Text>
        <Text style={styles.text}>Version {Version}</Text>
      </View> */}
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
              <Text key={index} style={styles.text}>
                {element}
              </Text>
            );
          })}
        </View>
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
    // marginVertical: '2%',
    borderRadius: 10,
    marginVertical: '2.5%',
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
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '15%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    width: '100%',
    gap: 10,
  },
  // titleColumnOneContainer: {
  //     flexDirection: "row",
  //     justifyContent: "flex-start",
  //     alignItems: "center"
  // }
  column: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'pink',
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
});
