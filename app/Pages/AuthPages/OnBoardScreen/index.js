import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import images from '../../../assets/images';
import NavigationService from '../../../Navigation/NavigationService';
import ScreenNames from '../../../Navigation/ScreenNames';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../../../utils/Resolution';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import appStyles from '../../../assets/Styles/AppStyles';
import {fonts} from '../../../themes/themes';
const {width} = Dimensions.get('window');
const data = [
  {
    source: images.onboardOne,
    text: 'Discussion about Drug, symptom recording and Genomic DNA sequencing ',
  },
  {
    source: images.onboardTwo,
    text: 'Discussion about Drug, symptom recording and Genomic DNA sequencing ',
  },
  {
    source: images.onboardThree,
    text: 'Discussion about Drug, symptom recording and Genomic DNA sequencing ',
  },
];

const OnBoardScreen = () => {
  const [index, setIndex] = useState(0);

  const isCarousel = useRef(null);

  const CarouselCardItem = ({item, index}) => {
    return (
      <View style={styles.CarouselCardView}>
        <Image source={item.source} style={styles.homeImage} />
        <Text style={styles.CarouselCardTxt}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <TouchableOpacity
        onPress={() =>
          NavigationService.navigate(ScreenNames.stackNavigation.Login)
        }>
        {index === 2 ? (
          <Text style={styles.skipTxt}>Done</Text>
        ) : (
          <Text style={styles.skipTxt}>Skip</Text>
        )}
      </TouchableOpacity>

      <Carousel
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={width}
        itemWidth={width}
        inactiveSlideShift={0}
        autoplay={true}
        autoplayDelay={100}
        autoplayInterval={3000}
        loop={true}
        containerCustomStyle={{flex: 1}}
        slideStyle={{flex: 1}}
        loopClonesPerSide={data.length}
        onSnapToItem={index => setIndex(index)}
        scrollEnabled={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.8}
        inactiveDotScale={0.7}
        dotColor={'#004E8B'}
        inactiveDotColor={'#D9D9D9'}
        tappableDots={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeImage: {
    width: width,
    marginLeft: scaledWidth(15),
    // height: scaledHeight(250),
  },
  skipTxt: {
    textAlign: 'right',
    marginRight: scaledWidth(20),
    marginTop: scaledHeight(20),
    fontSize: 18,
    fontFamily: fonts.medium,
    color: '#000000',
  },
  CarouselCardView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CarouselCardTxt: {
    textAlign: 'center',
    marginLeft: scaledWidth(25),
    marginRight: scaledWidth(25),
    marginTop: scaledWidth(25),
    fontSize: 14,
    color: '#004E8B',
    fontFamily: fonts.medium,
  },
});

export default OnBoardScreen;
