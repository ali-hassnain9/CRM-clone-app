import React from 'react';
import {StyleSheet, View} from 'react-native';

const Skeleton = props => {
  return (
    <View>
      {props.loading &&
        Array(5)
          .fill()
          .map((item, index) => {
            return (
              <View key={index} style={styles.placeholderStyle}>
                <View style={styles.leadIdContainer} />
                <View style={styles.leadStatusContainer} />
                <View style={styles.leadNameContainer} />
                <View style={styles.leadTypeContainer} />
                <View style={styles.leadDateContainer} />
              </View>
            );
          })}
    </View>
  );
};
export default Skeleton;
const styles = StyleSheet.create({
  placeholderStyle: {
    height: 110,
    backgroundColor: 'white',
    marginTop: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingTop: 10,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  leadIdContainer: {
    height: 10,
    width: 60,
    backgroundColor: '#e1e4e8',
    top: 15,
    marginStart: 10,
    borderRadius: 20,
  },
  leadStatusContainer: {
    height: 10,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#e1e4e8',
    top: 20,
    marginStart: 10,
    left: 250,
  },
  leadNameContainer: {
    height: 10,
    width: 150,
    borderRadius: 20,
    backgroundColor: '#e1e4e8',
    top: 20,
    marginStart: 10,
  },
  leadTypeContainer: {
    height: 10,
    width: 130,
    borderRadius: 20,
    backgroundColor: '#e1e4e8',
    top: 40,
    marginStart: 10,
  },
  leadDateContainer: {
    height: 10,
    width: 70,
    borderRadius: 15,
    backgroundColor: '#e1e4e8',
    top: 30,
    marginStart: 10,
    left: 250,
  },
});
