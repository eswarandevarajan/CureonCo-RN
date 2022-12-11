import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
  SectionList,
  Image,
} from 'react-native';
import {colors, fonts} from '../themes/themes';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../utils/Resolution';
import Icon from './Icon';
import Modal from 'react-native-modal';
import {useState} from 'react';
import {CureOncoFlatList, CureOncoListSeparator} from './CureOncoAtoms';
import appStyles from '../assets/Styles/AppStyles';
import CheckBox from '@react-native-community/checkbox';
import {Select_Box} from '../Constants/TextConstants';
import Input from './Input';
import Button from './Button';
import {useDispatch} from 'react-redux';
import {SAVE_NEW_MUTATION} from '../Service/AuthService';
import {BackHeaderComponent} from './HeaderComponent';
import {useEffect} from 'react';

const {width, height} = Dimensions.get('window');

let listColors = [
  'rgba(236, 204, 104, 0.1)',
  'rgba(255, 127, 80, 0.1)',
  'rgba(255, 107, 129, 0.1)',
];

let listTxtColors = ['#ECCC68', '#FF7F50', '#FF6B81'];

const SelectBox = props => {
  const {
    dataSource = [],
    stateselected = '',
    selectType,
    selectTitle,
    onSelectedState,
    containerStyles,
    name,
    type,
    size,
    iconColor,
    icon = false,
    image = false,
    source,
    imageStyle,
    error,
  } = props ?? {};

  const dispatch = useDispatch();

  const [selectedState, setSelectedState] = useState(stateselected);
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [isCheckedName, setIsCheckedName] = useState([]);
  const [showOtherMutation, setShowOtherMutation] = useState(false);
  const [mutationName, setMutationName] = useState(false);

  const onCheckChange = item => {
    const checkedIds = [...isChecked];
    const checkedNames = [...isCheckedName];
    const index = checkedIds.indexOf(item._id);
    if (index > -1) {
      checkedIds.splice(index, 1);
      checkedNames.splice(index, 1);
    } else {
      checkedIds.push(item._id);
      checkedNames.push(item.title);
    }

    item.title === 'Others' && !showOtherMutation
      ? setShowOtherMutation(true)
      : setShowOtherMutation(false);
    setIsChecked(checkedIds);
    setIsCheckedName(checkedNames);
  };

  const listSeparator = () => {
    return <View style={styles.itemSep} />;
  };

  const showMarkers = data => {
    if (data?.title === 'Mutation') {
      return (
        <View>
          <Text style={styles.titleTxt}>{data.title.toUpperCase()}</Text>
          <SectionList
            ItemSeparatorComponent={listSeparator}
            sections={data?.content}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => renderItem(item)}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.sectionTitleTxt}>{title}</Text>
            )}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.titleTxt}>{data?.title.toUpperCase()}</Text>
          <CureOncoFlatList
            data={data?.content}
            renderItem={({item}) => (
              <View style={{width: width}}>
                <TouchableOpacity
                  style={styles.checkTouch}
                  onPress={() => {
                    setShow(false);
                    setSelectedState(item.title);
                    onSelectedState(item._id);
                  }}>
                  <Text style={styles.itemText}>{item.title} </Text>
                  {/* <CheckBox
                    value={isChecked.includes(item._id)}
                    onValueChange={() => onCheckChange(item)}
                    style={styles.checkbox}
                    tintColors={{false: '#D4D4D4', true: '#004E8B'}}
                  /> */}
                </TouchableOpacity>

                {item.title === 'Others' && showOtherMutation ? (
                  <View style={styles.inputView}>
                    <Input
                      placeholder={Select_Box.mutation_placeholder_txt}
                      value={mutationName}
                      editable={true}
                      style={{
                        width: width / 1.4,
                        marginRight: scaledWidth(10),
                        marginLeft: scaledWidth(10),
                      }}
                      isMandatory={true}
                      onChangeText={text => {
                        setMutationName(text);
                      }}
                    />
                    <Button
                      btnLabel={Select_Box.save_btn}
                      style={{width: width / 5}}
                      btnPress={saveMutation}
                    />
                  </View>
                ) : null}
              </View>
            )}
            ItemSeparatorComponent={listSeparator}
          />
        </View>
      );
    }
  };

  const saveMutation = async () => {
    if (mutationName !== '') {
      dispatch(SAVE_NEW_MUTATION({title: mutationName, description: ''}));
      setShowOtherMutation(false);
    } else {
      // ToastMessage.error(Select_Box.mutation_placeholder_txt);
    }
  };

  const renderItem = (item, index) => {
    switch (selectType) {
      case 'Country':
        return (
          <TouchableOpacity
            style={styles.itemTouch}
            onPress={() => {
              setSelectedState(item.name);
              setShow(false);
              onSelectedState({
                country: item.name,
                state: item.states,
                phoneCode: item.phone_code,
              });
            }}>
            <Text style={styles.itemText}>{item.name} </Text>
          </TouchableOpacity>
        );
      case 'State':
        return (
          <TouchableOpacity
            style={styles.itemTouch}
            onPress={() => {
              setSelectedState(item.name);
              setShow(false);
              onSelectedState(item.name);
            }}>
            <Text style={styles.itemText}>{item.name} </Text>
          </TouchableOpacity>
        );
      case 'Stage':
        return (
          <TouchableOpacity
            style={styles.itemTouch}
            onPress={() => {
              console.log(item);
              setSelectedState(item.name);
              setShow(false);
              onSelectedState(item.id);
            }}>
            <Text style={styles.itemText}>{item.name} </Text>
          </TouchableOpacity>
        );
      case 'Cancer':
      case 'Markers':
      case 'Specialization':
        return (
          <TouchableOpacity
            style={styles.checkTouch}
            onPress={() => {
              setShow(false);
              setSelectedState(item.title);
              onSelectedState(item._id);
            }}>
            {/* <View
              style={[
                styles.linkImage,
                {
                  backgroundColor: listColors[index % listColors.length],
                },
              ]}>
              <Text
                style={[
                  styles.linkImageTxt,
                  {color: listTxtColors[index % listColors.length]},
                ]}>
                {item.title[0]}
              </Text>
            </View> */}
            <Text style={styles.itemText}>{item.title} </Text>
            {/* <CheckBox
              value={isChecked.includes(item._id)}
              onValueChange={() => onCheckChange(item)}
              style={styles.checkbox}
              tintColors={{false: '#D4D4D4', true: '#004E8B'}}
            /> */}
          </TouchableOpacity>
        );
    }
  };

  const renderHeader = () => {
    switch (selectType) {
      case 'Country':
      case 'State':
      case 'Stage':
        return (
          <View style={appStyles.backContainer}>
            <BackHeaderComponent
              title={selectTitle}
              onPress={() => setShow(false)}
            />
          </View>
        );
      case 'Cancer':
      case 'Markers':
      case 'Specialization':
        return (
          <View style={appStyles.backContainer}>
            <BackHeaderComponent
              title={selectTitle}
              onPress={() => setShow(false)}
            />
          </View>
          // <View style={appStyles.backContainer}>
          //   <View style={appStyles.backHeaderView}>
          //     <TouchableOpacity
          //       style={appStyles.arrowTouch}
          //       onPress={() => setShow(false)}>
          //       <Icon
          //         name={'keyboard-arrow-left'}
          //         type={'MaterialIcons'}
          //         color={'#000'}
          //         size={30}
          //       />
          //     </TouchableOpacity>
          //     <Text style={appStyles.headerTitle}>{selectTitle}</Text>
          //     {/* <TouchableOpacity
          //       onPress={() => {
          //         setShow(false);
          //         const checkedName = isCheckedName.join(', ');
          //         setSelectedState(checkedName);
          //         onSelectedState(isChecked);
          //       }}>
          //       <Icon
          //         name={'checkmark-done-sharp'}
          //         type={'Ionicons'}
          //         size={35}
          //         style={styles.checkIcon}
          //       />
          //     </TouchableOpacity> */}
          //   </View>
          // </View>
        );
    }
  };

  const renderList = () => {
    switch (selectType) {
      case 'Country':
      case 'State':
      case 'Stage':
        return (
          <CureOncoFlatList
            style={styles.listStyle}
            data={dataSource}
            renderItem={({item}) => renderItem(item)}
            ItemSeparatorComponent={listSeparator}
          />
        );
      case 'Markers':
        return (
          <CureOncoFlatList
            data={dataSource}
            style={styles.listStyle}
            renderItem={({item}) => showMarkers(item)}
            ItemSeparatorComponent={listSeparator}
          />
        );
      case 'Cancer':
      case 'Specialization':
        return (
          <SectionList
            style={styles.listStyle}
            ItemSeparatorComponent={listSeparator}
            sections={dataSource}
            stickySectionHeadersEnabled={true}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => renderItem(item, index)}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.sectionTitleTxt}>{title}</Text>
            )}
          />
        );
    }
  };

  useEffect(() => {
    setSelectedState(stateselected);
  }, [stateselected]);

  return (
    <View style={[styles.container, containerStyles]}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={[styles.selectBox, error && styles.error]}>
        {icon && (
          <Icon
            name={name}
            color={iconColor}
            size={size}
            style={styles.iconStyle}
            type={type}
          />
        )}
        {image && <Image source={source} style={imageStyle} />}
        <Text numberOfLines={1} style={styles.selectedText}>
          {selectedState}
        </Text>
        <Icon
          name="keyboard-arrow-right"
          color={'#9499A6'}
          style={styles.rightIconStyle}
          type={'MaterialIcons'}
          size={25}
        />
      </TouchableOpacity>
      {error && (
        <Text caption medium style={styles.errorTxt}>
          {error?.message}
        </Text>
      )}
      <Modal
        onBackdropPress={() => setShow(false)}
        style={styles.modalStyle}
        useNativeDriver={true}
        animationInTiming={300}
        animationOutTiming={300}
        hideModalContentWhileAnimating
        isVisible={show}>
        <Animated.View>
          <View style={styles.modalView}>
            {renderHeader()}
            {renderList()}
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  selectBox: {
    backgroundColor: colors.white,
    fontSize: 16,
    alignItems: 'center',
    color: '#122C5C',
    flexDirection: 'row',
    borderRadius: 50,
    borderColor: '#D4D4D4',
    borderWidth: 1,
    paddingLeft: scaledWidth(15),
    paddingRight: scaledWidth(10),
    height: scaledHeight(60),
    marginTop: scaledHeight(25),
    marginLeft: scaledWidth(20),
    marginRight: scaledWidth(20),
  },
  selectedText: {
    fontFamily: fonts.semiBold,
    flex: 1,
    fontSize: 16,
    color: '#122C5C',
    marginLeft: scaledWidth(10),
  },
  modalStyle: {
    margin: 0,
    padding: 0,
    backgroundColor: colors.white,
    width: '100%',
  },
  modalView: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  itemText: {
    fontSize: 18,
    fontFamily: fonts.medium,
    flex: 1,
    padding: 12,
    color: '#737B7D',
    marginLeft: scaledWidth(25),
  },
  checkbox: {
    marginTop: scaledHeight(12),
    marginRight: scaledWidth(15),
    color: '#004E8B',
  },
  checkIcon: {
    color: '#004E8B',
    marginLeft: width / 9,
  },
  checkTouch: {
    flex: 1,
    flexDirection: 'row',
  },
  selectedModalTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.regular,
    color: '#2B354E',
    fontWeight: '400',
    marginLeft: scaledWidth(15),
    marginTop: scaledHeight(10),
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitleTxt: {
    fontSize: 18,
    color: colors.text_color,
    fontFamily: fonts.bold,
    paddingLeft: scaledWidth(10),
    paddingBottom: scaledHeight(5),
    paddingTop: scaledHeight(5),
    backgroundColor: colors.gray_bg,
  },
  sectionItemSep: {
    height: scaledHeight(1),
    width: '90%',
    marginLeft: scaledWidth(15),
    backgroundColor: 'rgba(224, 224, 224, 0.5)',
  },
  titleTxt: {
    fontFamily: fonts.bold,
    color: '#2B354E',
    // backgroundColor: colors.lightgray,
    paddingTop: scaledHeight(20),
    paddingBottom: scaledHeight(20),
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listStyle: {
    marginTop: scaledHeight(70),
    height: height / 1.12,
    position: 'absolute',
    width: '100%',
  },
  rightIconStyle: {
    flex: 0.1,
  },
  itemTouch: {
    flex: 1,
    flexDirection: 'row',
  },
  inputView: {
    flexDirection: 'row',
    width: width,
    paddingBottom: scaledHeight(5),
  },
  iconStyle: {
    alignSelf: 'center',
  },
  linkImage: {
    width: scaledWidth(60),
    height: scaledHeight(65),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkImageTxt: {
    fontFamily: fonts.medium,
    fontSize: 25,
  },
  error: {
    borderWidth: 1,
    borderColor: '#E7281C',
  },
  errorTxt: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#E7281C',
    marginTop: scaledHeight(5),
    marginLeft: scaledWidth(40),
  },
  itemSep: {
    height: scaledHeight(1),
    width: '94%',
    marginLeft: scaledWidth(10),
    backgroundColor: 'rgba(224, 224, 224, 0.5)',
  },
});

export default SelectBox;
