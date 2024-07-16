import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/colors/colors';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import CustomText from '../../../components/text/CustomText';
import {Images} from '../../../assets/images';
import {screenWidth} from '../../../utils/dimensions';
import {daysData, timeData} from '../../../utils/dummyData';
import CustomButton from '../../../components/button/CustomButton';

const BookApointment = () => {
  return (
    <View style={styles.container}>
      <Header heading={strings.bookapoint} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginLeft: 20, flex: 1}}>
        <CustomText
          color={Colors.lightGrey}
          size={15}
          text={strings.bookapoint}
        />
        <View style={styles.infoContainer}>
          <Image style={{marginRight: 7}} source={Images.info} />
          <CustomText
            size={16}
            color={Colors.lightGrey}
            text={strings.forcancelation}
            style={{width: screenWidth / 1.3}}
          />
        </View>
        <CustomText size={19} text={strings.serviceRequired} />
        <CustomText
          size={15}
          color={Colors.lightGrey}
          text={strings.hair_Cut}
          style={{marginVertical: 5}}
        />
        <View style={styles.selectedView}>
          <Image source={Images.crossRed} />
          <CustomText size={16} fontWeight="700" text={strings.riyal28} />
          <CustomText size={16} color={Colors.lightGrey} text={'2'} />
          <Image style={styles.icon} source={Images.user} />
          <CustomText size={16} color={Colors.lightGrey} text={strings.hour} />
          <Image style={styles.icon} source={Images.duration} />
          <CustomText size={16} text={strings.faux_hawk} />
        </View>
        <View style={[styles.selectedView, {marginVertical: 20}]}>
          <Image source={Images.crossRed} />
          <CustomText size={16} fontWeight="700" text={strings.riyal28} />
          <CustomText size={16} color={Colors.lightGrey} text={'2'} />
          <Image style={styles.icon} source={Images.user} />
          <CustomText size={16} color={Colors.lightGrey} text={strings.hour} />
          <Image style={styles.icon} source={Images.duration} />
          <CustomText size={16} text={strings.faux_hawk} />
        </View>
        <CustomText size={19} text={strings.youraddress} />
        <View
          style={[
            styles.selectedView,
            {alignItems: 'flex-start', marginVertical: 8},
          ]}>
          <Image style={styles.icon} source={Images.edited} />
          <View style={{marginLeft: 15}}>
            <CustomText
              numberOfLines={1}
              size={15}
              text={strings.address_Dummy}
            />
            <CustomText
              style={{textAlign: 'right'}}
              size={15}
              color={Colors.lightGrey}
              text={strings.newYork_address}
            />
          </View>
        </View>
        <CustomText
          style={{textAlign: 'center'}}
          size={19}
          color={Colors.primary}
          text={strings.changeaddress}
        />
        <CustomText
          style={{marginTop: 20, marginBottom: 10}}
          size={21}
          text={strings.day}
        />
        <FlatList
          data={daysData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity key={index} style={styles.days}>
                <CustomText size={16} text={item?.day} />
                <View>
                  <CustomText size={18} text={item?.date} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <CustomText
          style={{marginTop: 20, marginBottom: 10}}
          size={21}
          text={strings.time}
        />
        <FlatList
          data={timeData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity key={index} style={styles.time}>
                <CustomText size={16} text={item?.time} />
              </TouchableOpacity>
            );
          }}
        />
        <View style={{marginRight: 20, marginVertical: 20}}>
          <View style={styles.flexbox}>
            <CustomText size={21} text={strings.travelcost} />
            <View style={styles.flex}>
              <Image
                style={[styles.icon, {marginRight: 5}]}
                source={Images.dollar}
              />
              <CustomText size={21} text={strings.riyal28} />
            </View>
          </View>
          <View style={styles.flexbox}>
            <CustomText size={21} text={strings.total_Duration} />
            <View style={styles.flex}>
              <Image
                style={[styles.icon, {marginRight: 5}]}
                source={Images.duration}
              />
              <CustomText size={21} text={strings.hour} />
            </View>
          </View>
          <View style={styles.flexbox}>
            <CustomText size={21} text={strings.total_Cost} />
            <View style={styles.flex}>
              <Image
                style={[styles.icon, {marginRight: 5}]}
                source={Images.dollar}
              />
              <CustomText size={21} text={strings.riyal28} />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image style={{marginRight: 7}} source={Images.info} />
            <CustomText
              size={15}
              color={Colors.lightGrey}
              text={strings.cancelbooking}
            />
          </View>
        </View>
        <View style={styles.button}>
          <CustomButton
            // onPress={() => navigation.navigate(strings.bookapointment_screen)}
            text={strings.bookapointment}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BookApointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  selectedView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.grey100,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 16,
    marginRight: 25,
    justifyContent: 'space-evenly',
  },
  icon: {width: 20, height: 20},
  days: {
    borderWidth: 1,
    borderColor: Colors.grey100,
    borderRadius: 99,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 6,
    marginRight: 8,
  },
  time: {
    borderWidth: 1,
    borderColor: Colors.grey100,
    borderRadius: 99,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginRight: 8,
  },
  infoContainer: {flexDirection: 'row', marginTop: 20, marginBottom: 20},
  flexbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  button: {
    marginLeft: 10,
    marginVertical: 10,
    backgroundColor: Colors.white,
  },
});
