import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Icon} from '../../../../Components';
import styles from './Styles';

export const listChange = (changeVertical, onPress) => {
  return (
    <View style={styles.changeTopView}>
      <View style={styles.changeLeftView}>
        <Text style={styles.changeNameTxt}>Name</Text>
        <Icon name={'arrowup'} type={'AntDesign'} color={'#2B354E'} size={20} />
      </View>
      <TouchableOpacity onPress={onPress}>
        {changeVertical ? (
          <Icon
            name={'view-module'}
            type={'MaterialCommunityIcons'}
            color={'#737B7D'}
            size={30}
          />
        ) : (
          <Icon
            name={'nav-icon-list-a'}
            type={'Fontisto'}
            color={'#737B7D'}
            size={20}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export const doctorComponent = (changeVertical, onPress) => {
  return (
    <View style={styles.changeTopView}>
      <View style={styles.changeLeftView}>
        <Text style={styles.changeNameTxt}>Name</Text>
        <Icon name={'arrowup'} type={'AntDesign'} color={'#2B354E'} size={20} />
      </View>
      <TouchableOpacity onPress={onPress}>
        {changeVertical ? (
          <Icon
            name={'view-module'}
            type={'MaterialCommunityIcons'}
            color={'#737B7D'}
            size={30}
          />
        ) : (
          <Icon
            name={'nav-icon-list-a'}
            type={'Fontisto'}
            color={'#737B7D'}
            size={20}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
