import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {Icon, TimeFormat} from '../../../Components';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Styles';
import images from '../../../assets/images';
import ScreenNames from '../../../Navigation/ScreenNames';
import NavigationService from '../../../Navigation/NavigationService';
import appStyles from '../../../assets/Styles/AppStyles';
import {
  CureOncoAvatar,
  CureOncoFlatList,
  CureOncoImage,
  CureOncoListSeparator,
} from '../../../Components/CureOncoAtoms';
import {GET_JOURNALS, GET_ONCONEWS} from '../../../Service/MenuService';
import {MenuHeaderComponent} from '../../../Components/HeaderComponent';

let listColors = ['#FFEFEE', '#FFF3E6', '#E6EEF4'];

const HomeMenuScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.ProfileReducer?.userProfile);
  const {journalList, oncoNewsList} = useSelector(state => state.MenuReducer);

  const {medappprofile = {}} = userProfile ?? {};
  const {user = {}} = medappprofile;

  useEffect(() => {
    (async () => {
      await Promise.all([dispatch(GET_JOURNALS()), dispatch(GET_ONCONEWS())]);
    })();
  }, [dispatch]);

  const renderJournals = (item, index) => {
    return (
      <View
        style={[
          styles.journalTopView,
          {backgroundColor: listColors[index % listColors.length]},
        ]}>
        <Text style={styles.titleTxt}>{item.title}</Text>
        <Text style={styles.descpTxt} numberOfLines={5}>
          {item.description}
        </Text>
        <Text style={styles.journalDateTxt}>{item.date}</Text>
      </View>
    );
  };

  const renderOncoNews = ({item, index}) => {
    return (
      <View style={styles.listContainer}>
        <View style={styles.topicView}>
          <Text style={styles.itemTopicTxt}>{item?.topic}</Text>
          <Text style={styles.itemHourTxt}>
            {' '}
            {TimeFormat.formatTime(item?.published_date)}
          </Text>
        </View>
        <View style={styles.topicView}>
          <Text numberOfLines={3} style={styles.listItemTitle}>
            {item?.title}
          </Text>
          <CureOncoImage style={styles.listIcon} source={{uri: item?.media}} />
        </View>
        <Text numberOfLines={2} style={styles.listItemDesc}>
          {item?.summary}
        </Text>
      </View>
    );
  };

  const renderHeaderComponent = () => {
    return (
      <View>
        <View style={styles.trackTopView}>
          <View style={styles.trackTouchView}>
            <Text style={styles.feelingTxt}>Today I’m Feeling !</Text>
            <TouchableOpacity
              style={styles.trackTouch}
              onPress={() =>
                NavigationService.navigate(ScreenNames.stackNavigation.Track)
              }>
              <Icon
                name={'graph'}
                type={'Octicons'}
                size={20}
                style={styles.trackIcon}
                color={'#004E8B'}
              />
              <Text style={styles.tracTxt}>Track</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.feelingView}>
            <TouchableOpacity style={styles.feelingTouch}>
              <Icon
                name={'grin-alt'}
                type={'FontAwesome5'}
                size={50}
                color={'#45A191'}
              />
              <Text style={styles.feelingText}>Very Good</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.feelingTouch}>
              <Icon
                name={'smile'}
                type={'FontAwesome5'}
                size={50}
                color={'#5CF1DE'}
              />
              <Text style={styles.feelingText}>Good</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.feelingTouch}>
              <Icon
                name={'meh'}
                type={'FontAwesome5'}
                size={50}
                color={'#F9E150'}
              />
              <Text style={styles.feelingText}>Neutral</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.feelingTouch}>
              <Icon
                name={'frown'}
                type={'FontAwesome5'}
                size={50}
                color={'#F19E9E'}
              />
              <Text style={styles.feelingText}>Bad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.feelingTouch}>
              <Icon
                name={'emoticon-frown-outline'}
                type={'MaterialCommunityIcons'}
                size={52}
                color={'#E95E5E'}
              />
              <Text style={styles.feelingText}>VeryBad</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.serviceTxt}>OnCo Service</Text>
        <View style={styles.menuIconView}>
          <TouchableOpacity
            style={styles.menuIconTouch}
            onPress={() =>
              NavigationService.navigate(
                ScreenNames.tabNavigation.TargetedTherapy,
              )
            }>
            <CureOncoImage
              style={styles.menuIcon}
              source={images.targetedTherapy}
            />
            <Text style={styles.menuTxt}>TARGETED THERAPY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIconTouch}>
            <CureOncoImage
              style={styles.menuIcon}
              source={images.symptomsLog}
            />
            <Text style={styles.menuTxt}>SYMPTOMS LOG</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIconTouch}>
            <CureOncoImage style={styles.menuIcon} source={images.trailMatch} />
            <Text style={styles.menuTxt}>TRAIL MATCH</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuIconView}>
          <TouchableOpacity
            style={styles.menuIconTouch}
            onPress={() =>
              NavigationService.navigate(ScreenNames.tabNavigation.PatientForum)
            }>
            <CureOncoImage
              style={styles.menuIcon}
              source={images.patientsForum}
            />
            <Text style={styles.menuTxt}>PATIENT FORUM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuIconTouch}
            onPress={() =>
              NavigationService.navigate(
                ScreenNames.stackNavigation.DocumentsShare,
              )
            }>
            <CureOncoImage style={styles.menuIcon} source={images.documents} />
            <Text style={styles.menuTxt}>DOCUMENTS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIconTouch}>
            <CureOncoImage
              style={styles.menuIcon}
              source={images.closedCommunity}
            />
            <Text style={styles.menuTxt}>CLOSED COMMUNITY</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuIconView}>
          <TouchableOpacity
            style={styles.menuIconTouch}
            onPress={() =>
              NavigationService.navigate(ScreenNames.stackNavigation.OncoNews)
            }>
            <CureOncoImage style={styles.menuIcon} source={images.oncoNews} />
            <Text style={styles.menuTxt}>ONCO NEWS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIconTouch}>
            <CureOncoImage
              style={styles.menuIcon}
              source={images.appointments}
            />
            <Text style={styles.menuTxt}>APPOINTMENTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuIconTouch}
            onPress={() =>
              NavigationService.navigate(
                ScreenNames.stackNavigation.KnowYourDNA,
              )
            }>
            <CureOncoImage style={styles.menuIcon} source={images.knowDna} />
            <Text style={styles.menuTxt}>KNOW YOUR DNA</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.serviceTxt}>Appointment List</Text>
        <View style={styles.appointmentTopView}>
          <View style={styles.dateView}>
            <Text style={styles.monthTxt}>May</Text>
            <Text style={styles.dateTxt}>20</Text>
          </View>
          <View style={styles.doctorView}>
            <Text style={styles.doctorNameTxt}>Dr. Chaiya Mariy</Text>
            <Text style={styles.timeTxt}>08.00 am - 9.30 am</Text>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity style={styles.callIcon}>
              <Icon
                name={'phone'}
                type={'Feather'}
                color={'#004E8B'}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.videoIcon}>
              <Icon
                name={'video'}
                type={'Feather'}
                color={'#004E8B'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
        {journalList?.length > 0 && (
          <View>
            <Text style={styles.serviceTxt}>My Journal</Text>
            <CureOncoFlatList
              style={styles.journalList}
              data={journalList}
              horizontal={true}
              renderItem={({item, index}) => renderJournals(item, index)}
            />
          </View>
        )}
        {oncoNewsList?.length > 0 && (
          <Text style={styles.serviceTxt}>Onco News Feed </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <MenuHeaderComponent
          menuOnPress={() => navigation.openDrawer()}
          title={'My Dashboard'}
          bellOnPress={() => navigation.openDrawer()}
        />
        <View style={styles.profileView}>
          <CureOncoAvatar
            user={user}
            size={60}
            styles={appStyles.profileIcon}
          />
          <View>
            <Text style={styles.nameTxt}>Hi, {user?.name}</Text>
            <Text style={styles.emailTxt}>{user?.email}</Text>
          </View>
        </View>
        <View style={styles.listView}>
          <CureOncoFlatList
            data={oncoNewsList?.slice(0, 3)}
            renderItem={renderOncoNews}
            style={styles.listStyle}
            ItemSeparatorComponent={<CureOncoListSeparator />}
            ListHeaderComponent={renderHeaderComponent}
            ListFooterComponent={
              <TouchableOpacity
                onPress={() =>
                  NavigationService.navigate(
                    ScreenNames.stackNavigation.OncoNews,
                  )
                }>
                <Text style={styles.seeMoreTxt}>See More... </Text>
              </TouchableOpacity>
            }
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeMenuScreen;
