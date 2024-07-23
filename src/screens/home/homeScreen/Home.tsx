import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import strings from '../../../utils/strings/strings';
import {Images} from '../../../assets/images';
import CustomText from '../../../components/text/CustomText';
import DetailCard from '../../../components/detailCard/DetailCard';
import DropDownPicker from 'react-native-dropdown-picker';
import {screenWidth} from '../../../utils/dimensions';
import ToggleSwitch from 'toggle-switch-react-native';
import {BookingData} from '../../../utils/dummyData';
import HomeCards from '../../../components/HomeCard/HomeCards';
import CustomeType from '../../../components/CustomType/CustomeType';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUserType} from '../../../Redux/Reducers/UserTypeSlice';

const Home = () => {
  const navigation: any = useNavigation();
  const [open, setOpen] = useState(false);
  const userType = useSelector(getUserType);
  const [toggleState, setToggleState] = useState(true);
  const [value, setValue] = useState(strings.newyork);
  const [items, setItems] = useState([
    {label: strings.newyork, value: strings.newyork},
    {label: 'Banana', value: 'banana'},
    {label: 'Pear', value: 'pear'},
  ]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(strings.thismonth);
  const [items1, setItems1] = useState([
    {label: strings.thismonth, value: strings.thismonth},
    {label: 'Banana', value: 'banana'},
    {label: 'Pear', value: 'pear'},
  ]);

  const handleToggle = (isOn: boolean) => {
    setToggleState(isOn);
  };

  const renderItem = (item: any, index: number) => {
    return (
      <View style={{paddingVertical: 6, paddingHorizontal: 4}}>
        <DetailCard
          bgcolor={index === 0 ? Colors.primary : Colors.white}
          countColor={index === 0 ? Colors.white : Colors.primary}
          headingColor={index === 0 ? Colors.white : Colors.primary}
          count={item?.count}
          heading={item?.heading}
        />
      </View>
    );
  };
  return (
    <View style={styling.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomText
          color={Colors.lightGrey}
          size={14}
          text={strings?.location}
        />
        <View style={styling.flex}>
          <Image source={Images.location} />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styling.locDropdown}
            placeholder={strings.location}
            placeholderStyle={{color: Colors.lightGrey}}
            listMode="MODAL"
          />
        </View>
        <TouchableOpacity
          activeOpacity={strings.buttonopacity}
          onPress={() =>
            navigation.navigate(
              userType === 'user'
                ? strings.userNotificationsScreen
                : strings.notification_screen,
            )
          }
          style={styling.bell}>
          <Image source={Images.bell} />
        </TouchableOpacity>
        <View style={styling.approve}>
          <Image style={{marginRight: 5}} source={Images.tick} />
          <CustomText
            size={14}
            color={Colors.white}
            text={strings.profileapprove}
          />
        </View>
        <View style={styling.online}>
          <CustomText size={13} text={strings.setavailability} />
          <View style={styling.rowContainer}>
            <CustomText
              color={Colors.green}
              style={{marginRight: 6}}
              size={13}
              text={strings.online}
            />
            <ToggleSwitch
              isOn={toggleState}
              onToggle={handleToggle}
              onColor={Colors.primary}
              offColor={Colors.lightGrey}
              size="small"
            />
          </View>
        </View>
        <FlatList
          scrollEnabled={false}
          data={BookingData}
          numColumns={2}
          renderItem={({item, index}) => renderItem(item, index)}
        />
        <View style={styling.price}>
          <View>
            <CustomText
              style={styling.marginText}
              text={strings.myearning}
              size={16}
              color={Colors.primary}
            />
            <DropDownPicker
              open={open1}
              value={value1}
              items={items1}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setItems1}
              labelStyle={{color: Colors.primary, fontSize: 16}}
              style={styling.monthdropDown}
              placeholder={strings.location}
              placeholderStyle={{color: Colors.lightGrey}}
              listMode="MODAL"
            />
          </View>
          <CustomText
            size={24}
            style={{width: 95}}
            color={Colors.primary}
            fontWeight="bold"
            text={'671' + ' ' + strings.sr}
          />
        </View>
        <View style={styling.seeAllView}>
          <CustomText size={14} text={strings.seeall} />
          <CustomText size={16} text={strings.myservices + '(18)'} />
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HomeCards />
          <HomeCards />
          <HomeCards />
        </ScrollView>
        <View style={styling.seeAllView}>
          <CustomText size={14} text={strings.seeall} />
          <CustomText size={16} text={strings.myservices + '(18)'} />
        </View>
        <CustomeType
          bgColor={Colors.white}
          text={strings.type20}
          textName={strings.hair_Cut}
        />
        <CustomeType
          bgColor={Colors.white}
          text={strings.type12}
          textName={strings.hair_Coloring}
        />
        <CustomeType
          bgColor={Colors.white}
          text={strings.type08}
          textName={strings.hair_Wash}
        />
        <CustomeType
          bgColor={Colors.white}
          text={strings.type20}
          textName={strings.hair_Cut}
        />
        <CustomeType
          bgColor={Colors.white}
          text={strings.type12}
          textName={strings.hair_Coloring}
        />
        <CustomeType
          bgColor={Colors.white}
          text={strings.type08}
          textName={strings.hair_Wash}
        />
      </ScrollView>
    </View>
  );
};

export default Home;

const styling = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  rowContainer: {flexDirection: 'row'},
  buttonStyle: {width: screenWidth / 6, marginLeft: '9%'},
  textStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  seeAllView: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  marginText: {marginBottom: -10, marginLeft: 12},
  borderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.grey100,
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialOfferText: {width: screenWidth / 4},
  loc: {
    color: Colors.lightGrey,
  },
  center: {
    alignItems: 'center',
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  locDropdown: {
    borderColor: 'transparent',
    width: screenWidth / 1.5,
    backgroundColor: 'transparent',
  },
  approve: {
    backgroundColor: Colors.green,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    marginBottom: 18,
  },
  online: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderColor: Colors.grey100,
    borderWidth: 1,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    marginTop: 7,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  monthdropDown: {
    borderColor: 'transparent',
    width: screenWidth / 3.5,
    backgroundColor: 'transparent',
  },
  bell: {position: 'absolute', right: 0, top: 15},
});
