import React, {Component} from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import {Slider} from 'react-native-elements';
import {Icon} from '../../../Components';
import {CureOncoListSeparator} from '../../../Components/CureOncoAtoms';
import {colors, fonts} from '../../../themes/themes';
import {scaledHeight, scaledWidth} from '../../../utils/Resolution';
import styles from './Styles';

const SymptomSlider = props => {
  const {selectedSymptom, symptomType, max, min} = props;

  const [smiley, setSmiley] = useState('grin-alt');
  const [color, setColor] = useState('#52C51A');
  const [symptomsLog, setSymptomsLog] = useState({
    value: 0,
    symptom: 'None',
  });

  const showSmiley = count => {
    switch (count) {
      case 0:
        setSmiley('grin-alt');
        setColor('#52C51A');
        setSymptomsLog({
          value: count,
          symptom: 'None',
        });
        selectedSymptom({
          symptomType: symptomType,
          symptomValue: count,
          symptomLevel: symptomsLog.symptom,
        });
        break;

      case 3:
        setSmiley('smile');
        setColor('#52C51A');
        setSymptomsLog({
          value: count,
          symptom: 'Mild',
        });
        selectedSymptom({
          symptomType: symptomType,
          symptomValue: count,
          symptomLevel: symptomsLog.symptom,
        });
        break;

      case 5:
        setSmiley('meh');
        setColor('#FAAD15');
        setSymptomsLog({
          value: count,
          symptom: 'Moderate',
        });
        selectedSymptom({
          symptomType: symptomType,
          symptomValue: count,
          symptomLevel: symptomsLog.symptom,
        });
        break;

      case 7:
        setSmiley('frown');
        setColor('#FF190C');
        setSymptomsLog({
          value: count,
          symptom: 'Severe',
        });
        selectedSymptom({
          symptomType: symptomType,
          symptomValue: count,
          symptomLevel: symptomsLog.symptom,
        });
        break;

      case 10:
        setSmiley('frown');
        setColor('#FF190C');
        setSymptomsLog({
          value: count,
          symptom: 'Very Severe',
        });
        selectedSymptom({
          symptomType: symptomType,
          symptomValue: count,
          symptomLevel: symptomsLog.symptom,
        });
        break;
    }
  };

  return (
    <View style={styles.symptomSliderContainer}>
      <Text style={styles.symptomTypeTxt}>
        {symptomType?.replace(/_/g, ' ')}
      </Text>
      <CureOncoListSeparator />
      <View style={styles.symptomView}>
        <Text style={styles.symptomTxt}>Symptom : {symptomsLog.symptom}</Text>
        <Text style={styles.valueTxt}>Value : {symptomsLog.value}</Text>
      </View>
      <CureOncoListSeparator />

      {/* <View style={styles.sliderView}>
        <Icon
          name={smiley}
          type={'FontAwesome5'}
          size={30}
          color={color}
          style={{paddingRight: scaledWidth(10)}}
        />

        <View style={{width: '85%'}}>
          <Slider
            value={symptomsLog.value}
            onValueChange={value => this.showSmiley(value)}
            maximumValue={max}
            minimumValue={min}
            step={1}
            trackStyle={{
              height: scaledHeight(10),
              backgroundColor: colors.app_color,
            }}
            maximumTrackTintColor={'#ccc'}
            minimumTrackTintColor={color}
            thumbStyle={[styles.sliderThumb, {backgroundColor: color}]}
          />
        </View>
      </View> */}
    </View>
  );
};

export default SymptomSlider;
