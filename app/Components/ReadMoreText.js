import React, {useState, useCallback} from 'react';
import ParsedText from 'react-native-parsed-text';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../themes/themes';
import {scaledHeight, scaledWidth} from '../utils/Resolution';

export const ReadMoreText = props => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 2);
  }, []);

  const handleUrlPress = (link, matchIndex /*: number*/) => {
    // CustomTabs.openURL(link)
    //     .then(launched => {
    //         console.log(`Launched custom tabs: ${launched}`);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });
  };

  const renderText = (matchingString, matches) => {
    let pattern = /\[(@[^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);
    return `^^${match[1]}^^`;
  };

  return (
    <View style={{marginTop: scaledHeight(15), marginLeft: scaledWidth(10)}}>
      <Text
        numberOfLines={textShown ? undefined : 2}
        onTextLayout={onTextLayout}>
        <ParsedText
          numberOfLines={3}
          style={styles.text}
          parse={[
            {
              type: 'url',
              style: styles.url,
              onPress: handleUrlPress,
            },
            {
              type: 'phone',
              style: styles.phone,
            },
            {
              type: 'email',
              style: styles.email,
            },
            {
              pattern: /Bob|David/,
              style: styles.name,
            },
            {
              pattern: /\[(@[^:]+):([^\]]+)\]/i,
              style: styles.username,
              renderText: renderText,
            },
            {pattern: /42/, style: styles.magicNumber},
            {
              pattern: /#(\w+)/,
              style: styles.hashTag,
            },
          ]}
          childrenProps={{allowFontScaling: false}}>
          {props.text}
        </ParsedText>
      </Text>

      {lengthMore ? (
        <TouchableOpacity onPress={toggleNumberOfLines}>
          <Text style={styles.readMoreTxt}>
            {textShown ? 'Read Less...' : 'Read More...'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  url: {
    color: colors.lightblue,
    textDecorationLine: 'underline',
  },
  email: {
    textDecorationLine: 'underline',
  },
  text: {
    color: '#747D8C',
    fontSize: 15,
    fontFamily: fonts.bold,
  },
  phone: {
    color: colors.lightblue,
    textDecorationLine: 'underline',
  },
  name: {
    color: 'red',
  },
  username: {
    color: 'green',
    fontWeight: 'bold',
  },
  magicNumber: {
    fontSize: 42,
    color: 'pink',
  },
  hashTag: {
    color: colors.lightblue,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  readMoreTxt: {
    lineHeight: 21,
    marginTop: scaledHeight(2),
    color: '#004E8B',
    fontSize: 15,
    fontFamily: fonts.bold,
  },
});
