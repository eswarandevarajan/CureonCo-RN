import React from 'react';
import {View, FlatList, Image, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import {fonts} from '../themes/themes';
import {scaledHeight, scaledWidth} from '../utils/Resolution';

export const CureOncoAvatar = props => {
  const {user, size, styles} = props;
  return (
    <View style={styles}>
      {user?.avatar !== undefined ? (
        <Avatar.Image size={size} source={{uri: user?.avatar}} />
      ) : (
        <Avatar.Text size={size} label={user?.name?.charAt(0)} />
      )}
    </View>
  );
};

export const CureOncoFlatList = props => {
  const {
    data,
    renderItem,
    keyExtractor,
    ListFooterComponent,
    ListHeaderComponent,
    ListEmptyComponent,
    numColumns,
    columnWrapperStyle,
    contentContainerStyle,
    style,
    onRefresh,
    refreshing,
    removeClippedSubviews,
    ItemSeparatorComponent,
    horizontal = false,
    initialNumToRender,
  } = props;
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      columnWrapperStyle={columnWrapperStyle}
      contentContainerStyle={contentContainerStyle}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      style={style}
      onRefresh={onRefresh}
      refreshing={refreshing}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={removeClippedSubviews}
      ItemSeparatorComponent={ItemSeparatorComponent}
      initialNumToRender={initialNumToRender}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export const CureOncoImage = props => {
  const {source, style, PlaceholderContent} = props;
  return (
    <Image
      style={style}
      source={source}
      PlaceholderContent={PlaceholderContent}
    />
  );
};

export const CureOncoEmptyComponent = props => {
  const {text} = props;
  return <Text style={styles.txtStyles}>{text}</Text>;
};

export const CureOncoListSeparator = () => {
  return <View style={styles.itemSep} />;
};

const styles = StyleSheet.create({
  txtStyles: {
    color: '#2B354E',
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginTop: scaledHeight(50),
  },
  itemSep: {
    height: scaledHeight(1),
    width: '94%',
    marginLeft: scaledWidth(10),
    backgroundColor: 'rgba(224, 224, 224, 0.5)',
  },
});
