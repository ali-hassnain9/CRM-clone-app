import React, {createRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IC_DOWNARROW, IC_TICK} from '../../assets';
import {CustomBottomSheet} from '../components/customBottomSheet';

const singleOrMultipleSelectionField = props => {
  const actionSheetRef = createRef();

  const _handleShowActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const handleClickSingle = item => {
    props.onSelect(item);
  };

  const exists = item => {
    let check = props.selected?.some(selected => selected.id === item.id);
    return check;
  };

  const renderChipsView = () => {
    return (
      <>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
          <Text style={styles.chipsTitle}>{props.name}</Text>
        </View>
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {props.data?.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={item.id}
                onPress={() => {
                  if (props.isSingleSelect === true) {
                    handleClickSingle(item);
                  } else {
                    props.onSelect(item);
                  }
                }}>
                {exists(item) ? (
                  <View style={styles.chipsView}>
                    <Text style={styles.textColor}>{item.name}</Text>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.chipsView,
                      {
                        backgroundColor: '#dfdfdf',
                        borderColor: '#dfdfdf',
                        borderWidth: 0,
                      },
                    ]}>
                    <Text style={{color: 'gray'}}>{item.name}</Text>
                  </View>
                )}
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </>
    );
  };

  const renderBottomSheet = () => {
    return (
      <View>
        <View style={styles.filterCard}>
          <TouchableWithoutFeedback onPress={() => _handleShowActionSheet()}>
            <View style={styles.filterCardTitleAndIcon}>
              <View style={styles.filterTitle}>
                <View style={styles.filterImage}>
                  <Image source={props.logo} style={styles.logoStyles} />
                </View>
                <View>
                  <Text>{props.name}</Text>
                  <Text style={styles.values}>
                    {props.selected &&
                      props.selected.length > 0 &&
                      props.selected.map(value => value.name).join(', ')}
                  </Text>
                </View>
              </View>
              <View>
                <Image source={IC_DOWNARROW} style={styles.arrowStyles} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <CustomBottomSheet
            selected={props.selected}
            actionSheetRef={actionSheetRef}
            data={props.data}
            isSingleSelect={props.isSingleSelect}
            onSelect={props.onSelect}
            dataType={props.dataType}
            exists={exists}
            onSelected={props.onSelected}
          />
        </View>
        <View style={styles.separator} />
      </View>
    );
  };

  return props.data?.length < 5 ? renderChipsView() : renderBottomSheet();
};

export default singleOrMultipleSelectionField;

const styles = StyleSheet.create({
  textColor: {color: 'red'},
  chipsTitle: {
    fontSize: 14,
    marginLeft: 40,
  },
  values: {
    marginRight: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  chipsView: {
    height: 40,
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    margin: 5,
    marginLeft: 40,
    backgroundColor: '#f5d0d0',
    borderColor: 'red',
    borderWidth: 1,
  },
  filterCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingVertical: 20,
  },
  filterCardTitleAndIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  filterTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterImage: {
    backgroundColor: '#fafafc',
    borderRadius: 20,
    padding: 8,
    marginRight: 8,
  },
  logoStyles: {
    resizeMode: 'contain',
    height: 15,
    width: 15,
  },
  arrowStyles: {
    height: 15,
    marginHorizontal: 20,
    width: 10,
    transform: [{rotateZ: '270deg'}],
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
