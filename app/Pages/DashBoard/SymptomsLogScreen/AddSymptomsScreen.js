import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Icon, Input, TimeFormat} from '../../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_SYMPTOMLIST,
  GET_TARGETEDTHERAPY,
} from '../../../Service/MenuService';
import styles from './Styles';
import images from '../../../assets/images';
import appStyles from '../../../assets/Styles/AppStyles';
import {MenuHeaderComponent} from '../../../Components/HeaderComponent';
import TargetedTherapyComponent from '../Component/TargetedTherapyComponent';
import PagerView from 'react-native-pager-view';
import {Dash_Board} from '../../../Constants/TextConstants';
import {CureOncoFlatList} from '../../../Components/CureOncoAtoms';
import SymptomSlider from './SymptomSlider';
import {colors} from '../../../themes/themes';

let listColors = [
  'rgba(255, 99, 72, 0.5)',
  'rgba(255, 165, 2, 0.5)',
  'rgba(123, 237, 159, 0.5)',
  'rgba(112, 161, 255, 0.5)',
];

const symptomsData = {};

const date = new Date();

const AddSymptomsScreen = props => {
  const dispatch = useDispatch();

  const symptoms = useSelector(state => state.MenuReducer?.symptoms);
  const [symptomNotes, setSymptomNotes] = useState('');

  useEffect(() => {
    dispatch(GET_SYMPTOMLIST());
  }, [dispatch]);

  const selectedSymptom = value => {
    symptomsData[value.symptomType] = value.symptomLevel;
  };

  console.log(date);

  const renderItem = ({item, index}) => {
    if (!item?.isYesOrNo) {
      if (
        symptomsData[item?.symptomName] === 'None' ||
        symptomsData[item?.symptomName] === undefined
      ) {
        symptomsData[item?.symptomName] = 'None';
      }
      return (
        <View style={styles.symptomsListView}>
          <View
            style={[
              styles.listColorView,
              {
                backgroundColor: listColors[index % listColors.length],
              },
            ]}
          />
          <SymptomSlider
            selectedSymptom={selectedSymptom}
            min={0}
            max={10}
            symptomType={item?.symptomName}
          />
        </View>
      );
    } else if (item?.isYesOrNo) {
      if (
        symptomsData[item?.symptomName] === 'no' ||
        symptomsData[item?.symptomName] === undefined
      ) {
        symptomsData[item?.symptomName] = 'no';
      }
      // return (
      //   <View>
      //     {item?.showinput ? (
      //       <SymptomSwitch
      //         symptomType={item?.symptomName}
      //         showinput={true}
      //         inputques={item?.inputques}
      //         selectedSymptom={selectedSymptom}
      //       />
      //     ) : (
      //       <SymptomSwitch
      //         symptomType={item?.symptomName}
      //         selectedSymptom={selectedSymptom}
      //       />
      //     )}
      //   </View>
      // );
    }
  };

  return (
    <View>
      <View style={styles.dateView}>
        <Text style={styles.dateTxt}>Today {TimeFormat.formatToDay(new Date(), true)}</Text>
      </View>
      <CureOncoFlatList
        removeClippedSubviews={false}
        style={styles.symptomListScrollView}
        data={symptoms}
        renderItem={renderItem}
        keyExtractor={({_id}) => _id?.toString()}
        ListFooterComponent={
          <Input
            value={symptomNotes}
            editable={true}
            placeholder={Dash_Board.symptoms.notes_txt}
            multiline={true}
            style={styles.notesInput}
            onChangeText={text => {
              setSymptomNotes(text);
            }}
          />
        }
      />
    </View>
  );
};

export default AddSymptomsScreen;
