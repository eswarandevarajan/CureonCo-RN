import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Icon} from '../../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {GET_TARGETEDTHERAPY} from '../../../Service/MenuService';
import styles from './Styles';
import images from '../../../assets/images';
import appStyles from '../../../assets/Styles/AppStyles';
import {
  BackHeaderComponent,
  MenuHeaderComponent,
} from '../../../Components/HeaderComponent';
import TargetedTherapyComponent from '../Component/TargetedTherapyComponent';
import PagerView from 'react-native-pager-view';
import AddSymptomsScreen from './AddSymptomsScreen';
import HistorySymptomsScreen from './HistorySymptomsScreen';
import NavigationService from '../../../Navigation/NavigationService';

const SymptomsLogScreen = props => {
  const dispatch = useDispatch();
  const ref = useRef(PagerView);

  const [isSymptoms, setIsSymptoms] = useState(true);
  const [isHistory, setIsHistory] = useState(false);

  const onPageScrollChanged = event => {
    const {position} = event.nativeEvent ?? {};
    if (position === 1) {
      setIsSymptoms(false);
      setIsHistory(true);
    } else if (position === 0) {
      setIsSymptoms(true);
      setIsHistory(false);
    }
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <BackHeaderComponent
          title={'Symptoms Log'}
          onPress={() => NavigationService.navigateBack()}
        />
        <View style={styles.topView}>
          <TouchableOpacity
            style={[styles.tabTouch, isSymptoms && styles.selectedTab]}
            onPress={() => {
              ref.current.setPage(0);
            }}>
            <Text style={[styles.tabTxt, isSymptoms && styles.selectedTxt]}>
              Your Symptoms
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabTouch, isHistory && styles.selectedTab]}
            onPress={() => {
              ref.current.setPage(1);
            }}>
            <Text style={[styles.tabTxt, isHistory && styles.selectedTxt]}>
              History
            </Text>
          </TouchableOpacity>
        </View>
        <PagerView
          style={styles.pagerView}
          initialPage={0}
          onPageScroll={onPageScrollChanged}
          ref={ref}>
          <View key="1" style={styles.listView}>
            <AddSymptomsScreen />
          </View>
          <View key="2">
            <HistorySymptomsScreen />
          </View>
        </PagerView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SymptomsLogScreen;
