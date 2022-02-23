import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IC_DOWNARROW} from '../../assets';
import React, {createRef} from 'react';
import {CustomBottomSheet} from './customBottomSheet';

const ChipFilter = props => {
  const actionSheetRef = createRef();
  const _handleShowActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const exists = item => {
    let check = props.selected?.some(selected => selected.id === item.id);
    return check;
  };
  return (
    <View>
      <View style={styles.filterCard}>
        <TouchableWithoutFeedback onPress={() => _handleShowActionSheet()}>
          <View style={styles.chip}>
            <Text>{props.name}</Text>
            <Image source={IC_DOWNARROW} style={styles.arrowStyles} />
          </View>
        </TouchableWithoutFeedback>
        <CustomBottomSheet
          exists={exists}
          data={props.data}
          isSingleSelect={props.isSingleSelect}
          dataType={props.dataType}
          onSelected={props.onSelected}
          selected={props.selected}
          actionSheetRef={actionSheetRef}
        />
      </View>
      <View style={styles.separator} />
    </View>
  );
};
export default ChipFilter;

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
