import React, {Component} from 'react';
import {Switch, View, Text} from 'react-native';
import {Input} from '../../../Components';
import {colors} from '../../../themes/themes';
import {scaledHeight} from '../../../utils/Resolution';
import styles from './Styles';

export default class SymptomSwitch extends Component {
  state = {
    count: false,
    inputval: '',
  };

  onInputChange(count) {
    this.setState({inputval: count});
    this.props.selectedSymptom({
      symptomType: this.props.symptomType + '_input',
      symptomLevel: count,
    });
  }

  render() {
    const {symptomType, selectedSymptom, showinput, inputques} = this.props;
    const {count, inputval} = this.state;
    return (
      <View style={styles.switchContainer}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View>
            <Text style={styles.textStyle}>
              {symptomType.replace(/_/g, ' ')}
            </Text>
          </View>
          <View style={styles.switchView}>
            <Text style={styles.switchTextStyle}>{count ? 'yes' : 'no'}</Text>
            <Switch
              style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={colors.bg}
              ios_backgroundColor="#3e3e3e"
              value={count}
              onValueChange={count => {
                selectedSymptom({
                  symptomType: symptomType,
                  symptomLevel: count ? 'yes' : 'no',
                });
                this.setState({count: count});
                if (count == false) {
                  this.onInputChange((count = 0));
                }
              }}
            />
          </View>
        </View>
        <Text>{count}</Text>
        <View style={{paddingBottom: scaledHeight(15)}}>
          {showinput === true && count && (
            <Input
              full
              number
              value={inputval}
              editable={true}
              placeholder={inputques}
              onChangeText={text => {
                this.onInputChange(text);
              }}
            />
          )}
        </View>
      </View>
    );
  }
}
