import React, {memo} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';

const Icon = props => {
  const {style, color, size, type, name} = props;
  switch (type) {
    case 'AntDesign':
      return <AntDesign name={name} color={color} size={size} style={style} />;
    case 'FontAwesome':
      return (
        <FontAwesome name={name} color={color} size={size} style={style} />
      );
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons
          name={name}
          color={color}
          size={size}
          style={style}
        />
      );
    case 'Entypo':
      return <Entypo name={name} color={color} size={size} style={style} />;
    case 'EvilIcons':
      return <EvilIcons name={name} color={color} size={size} style={style} />;
    case 'Feather':
      return <Feather name={name} color={color} size={size} style={style} />;
    case 'Ionicons':
      return <Ionicons name={name} color={color} size={size} style={style} />;
    case 'FontAwesome5':
      return (
        <FontAwesome5 name={name} color={color} size={size} style={style} />
      );
    case 'MaterialIcons':
      return (
        <MaterialIcons name={name} color={color} size={size} style={style} />
      );
    case 'Octicons':
      return <Octicons name={name} color={color} size={size} style={style} />;
    case 'Fontisto':
      return <Fontisto name={name} color={color} size={size} style={style} />;
    case 'Foundation':
      return <Foundation name={name} color={color} size={size} style={style} />;
    default: //regular
      return (
        <FontAwesome name={name} color={color} size={size} style={style} />
      );
  }
};

export default memo(Icon);
