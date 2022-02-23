import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IC_TICK} from '../../assets/index';
import ActionSheet from 'react-native-actions-sheet';
import React, {createRef} from 'react';

export const CustomBottomSheet = props => {
  const actionSheetRef = createRef();

  const _handleHideActionSheet = () => {
    props.actionSheetRef.current?.hide();
  };

  const selectedItems = selectedItem => {
    if (!props.isSingleSelect) {
      const filtered = props.selected?.some(
        leadSourceItem => leadSourceItem.id === selectedItem.id,
      );
      if (filtered) {
        let filteredData = props.selected?.filter(
          data => data.id !== selectedItem.id,
        );
        props.onSelected(filteredData);
      } else {
        let temp = [...props.selected];
        temp.push(selectedItem);
        props.onSelected(temp);
      }
    } else {
      props.onSelected([selectedItem]);
    }
  };

  return (
    <ActionSheet ref={props.actionSheetRef}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => _handleHideActionSheet()}>
          <View style={styles.topClosingBar} />
        </TouchableWithoutFeedback>
        <FlatList
          data={props.data}
          showsVerticalScrollIndicator={true}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <>
              <TouchableWithoutFeedback
                onPress={() => {
                  selectedItems(item);
                }}>
                <View style={styles.bottomSheet}>
                  <Text style={styles.bottomSheetItem}>
                    {item[props.dataType]}
                  </Text>
                  {props.exists(item) && (
                    <Image source={IC_TICK} style={styles.bottomSheetTick} />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </>
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#fff',
    height: 38,
    paddingHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  filterCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingVertical: 20,
  },
  arrowStyles: {
    height: 10,
    marginLeft: 5,
    width: 10,
  },
  bottomSheet: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 0.2,
    height: 60,
    borderBottomColor: '#b6b8b9',
    width: '100%',
    color: '#000',
  },
  bottomSheetTick: {
    tintColor: '#df2001',
    resizeMode: 'contain',
    height: 15,
    width: 15,
    marginRight: 20,
    position: 'absolute',
    right: 0,
  },
  bottomSheetItem: {
    marginHorizontal: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#e8e8e8',
    width: '75%',
    marginLeft: 55,
  },
  topClosingBar: {
    height: 5,
    backgroundColor: 'lightgray',
    width: 50,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: 'center',
  },
});
