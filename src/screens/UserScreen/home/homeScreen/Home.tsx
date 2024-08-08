import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Slick from 'react-native-slick';
import {useNavigation} from '@react-navigation/native';
import strings from '../../../../utils/strings/strings';
import CustomText from '../../../../components/text/CustomText';
import ArtistBrand from '../../../../components/artistBrand/ArtistBrand';
import ArtistDetail from '../../../../components/artistDetail/ArtistDetail';
import {Colors} from '../../../../utils/colors/colors';
import {Images} from '../../../../assets/images';
import {
  getArtist,
  homeServicesData,
  nearAtristDetail,
  services,
  topAtristDetail,
} from '../../../../utils/dummyData';
import {screenHeight, screenWidth} from '../../../../utils/dimensions';

const UserHome = () => {
  const navigation: any = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(strings.newyork);
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState(false);
  const [items, setItems] = useState([
    {label: strings.newyork, value: strings.newyork},
    {label: 'Banana', value: 'banana'},
    {label: 'Pear', value: 'pear'},
  ]);

  const renderItem = (item: any, index: number) => {
    return (
      <View key={index} style={styling.servicesContainer}>
        <TouchableOpacity
          activeOpacity={strings.buttonopacity}
          style={styling.imgView}>
          <Image source={item?.img} />
        </TouchableOpacity>
        <CustomText style={{marginTop: 6}} size={13} text={item.heading} />
      </View>
    );
  };
  const renderItemTopArtist = (item: any, index: number) => {
    return (
      <ArtistBrand
        image={item?.img}
        heading={item?.heading}
        distance={item?.distance}
        time={item?.time}
      />
    );
  };
  const renderItemNearArtist = (item: any, index: number) => {
    return (
      <ArtistDetail
        image={item?.img}
        heading={item?.heading}
        distance={item?.distance}
        time={item?.time}
        desc={item?.desc}
        address={item?.address}
      />
    );
  };
  const renderItemServices = (item: any, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(strings.onlinestorescreen)}
        activeOpacity={strings.buttonopacity}
        style={styling.iconView}>
        <Image style={{marginBottom: 5}} source={item?.img} />
        <CustomText text={item?.heading} />
      </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => navigation.navigate(strings.notification_screen)}
            activeOpacity={strings.buttonopacity}>
            <Image source={Images.bell} />
          </TouchableOpacity>
        </View>
        <View style={styling.searchContainer}>
          <View style={styling.input}>
            <View style={styling.flex1}>
              <Image
                style={{tintColor: Colors.primary}}
                source={Images.search}
              />
              <TextInput
                style={styling.textInput}
                placeholder={strings.searchsaloon}
                placeholderTextColor={Colors.lightGrey}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setFilter(!filter)}
            activeOpacity={strings.buttonopacity}
            style={styling.filter}>
            <Image
              source={Images.filter}
              tintColor={'white'}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
        {filter ? (
          <View style={{marginTop: 20}}>
            <CustomText size={18} text={strings.services} />
            <FlatList
              style={styling.flatlist}
              data={homeServicesData}
              scrollEnabled={false}
              numColumns={3}
              renderItem={({item, index}) => renderItemServices(item, index)}
            />
            <ImageBackground
              resizeMode="stretch"
              style={styling.bgImage}
              source={Images.tools}>
              <CustomText
                style={styling.heading}
                size={22}
                color={Colors.white}
                fontWeight="700"
                text={strings?.servicesDesc}
              />
            </ImageBackground>
            <View style={{width: 100, height: 100, backgroundColor: 'red'}} />
          </View>
        ) : (
          <View>
            <View style={styling.slick}>
              <Slick
                loop={false}
                index={index}
                paginationStyle={{flexDirection: 'row-reverse'}}
                dotStyle={styling.dot}
                activeDotStyle={styling.activeDot}
                showsButtons={false}>
                {getArtist?.map((item, index) => {
                  return (
                    <ImageBackground
                      key={index}
                      resizeMode="stretch"
                      style={styling.bgImage}
                      source={item?.img}>
                      <CustomText
                        style={styling.heading}
                        size={22}
                        color={Colors.white}
                        fontWeight="700"
                        text={item.heading}
                      />
                    </ImageBackground>
                  );
                })}
              </Slick>
            </View>
            <View style={styling.searchContainer}>
              <CustomText size={18} text={strings.services} />
              <CustomText
                size={13}
                color={Colors.primary}
                text={strings.seeall}
              />
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={services}
              renderItem={({item, index}) => renderItem(item, index)}
            />
            <View style={[styling.searchContainer, {marginTop: 8}]}>
              <CustomText
                size={13}
                color={Colors.primary}
                text={strings.seeall}
              />
              <CustomText size={18} text={strings.toprated} />
            </View>
            <FlatList
              style={{marginTop: 10}}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={topAtristDetail}
              renderItem={({item, index}) => renderItemTopArtist(item, index)}
            />
            <View style={[styling.searchContainer, {marginTop: 8}]}>
              <CustomText
                size={13}
                color={Colors.primary}
                text={strings.seeall}
              />
              <CustomText size={18} text={strings.nearartist} />
            </View>
            <FlatList
              style={styling.nearFlatlist}
              data={nearAtristDetail}
              scrollEnabled={false}
              renderItem={({item, index}) => renderItemNearArtist(item, index)}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default UserHome;

const styling = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  loc: {
    color: Colors.lightGrey,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth / 1.35,
  },
  locDropdown: {
    borderColor: 'transparent',
    width: screenWidth / 1.5,
    backgroundColor: 'transparent',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.grey100,
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 12,

    // width: screenWidth / 1.33,
    height: 50,
  },
  flex1: {flexDirection: 'row', alignItems: 'center'},
  textInput: {
    marginLeft: 8,
    width: screenWidth / 1.62,
    color: Colors.lightGrey,
    textAlign: 'right',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filter: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 8,
    marginTop: 12,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 10,
    height: 10,
    borderRadius: 99,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 99,
  },
  heading: {
    textAlign: 'right',
    marginRight: 16,
    marginTop: '12%',
  },
  servicesContainer: {
    marginHorizontal: 14,
    marginVertical: 6,
    flexDirection: 'column',
    alignItems: 'center',
  },
  imgView: {
    backgroundColor: Colors.grey200,
    borderRadius: 99,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slick: {height: screenHeight / 3.9, marginTop: 25},
  bgImage: {
    borderRadius: 8,
    height: screenHeight / 5,
    shadowColor: Colors.lightGrey,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  iconView: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  flatlist: {marginTop: 10, marginBottom: '18%', alignSelf: 'center'},
  nearFlatlist: {marginTop: 10, alignSelf: 'center'},
});
