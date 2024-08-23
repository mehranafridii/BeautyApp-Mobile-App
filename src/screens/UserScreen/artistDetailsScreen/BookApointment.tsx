import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import CustomText from '../../../components/text/CustomText';
import {Images} from '../../../assets/images';
import {screenWidth} from '../../../utils/dimensions';
import {daysData, timeData} from '../../../utils/dummyData';
import CustomButton from '../../../components/button/CustomButton';
import Utility from '../../../utils/utility/Utility';
import ServiceCard from '../../../components/serviceCard/ServiceCard';
interface BookAppointmentPropTypes {
  navigation: any;
}
const BookApointment: FC<BookAppointmentPropTypes> = ({navigation}) => {
  const [days, setDays] = useState(daysData);
  const [time, setTime] = useState(timeData);
  const [services, setServices] = useState([
    {
      serviceName: 'fauz hawk',
      persons: 2,
      price: 70,
      time: '2hr',
    },
    {
      serviceName: 'fauz hawk',
      persons: 1,
      price: 45,
      time: '1hr',
    },
  ]);

  const handleSelectedItem = (data: any, index: number, _setState: any) => {
    // const _days = [...days];
    // _days[index] = {
    //   ..._days[index],
    //   selected: _days[index]?.selected === true ? false : true,
    // };
    // setDays(_days);
    const updatedDate = Utility.selectItemMethod(data, index);
    _setState(updatedDate);
  };
  const removeService = (_index: Number) => {
    const updatedData = services?.filter((item, index) => index !== _index);
    setServices(updatedData);
  };
  // Main Return
  return (
    <View style={styles.container}>
      <Header heading={strings.bookapoint} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginLeft: 20, flex: 1}}>
        <CustomText
          color={Colors.lightGrey}
          style={{textAlign: 'left'}}
          size={15}
          text={strings.bookapoint}
        />
        <View style={styles.infoContainer}>
          <Image style={{marginRight: 7}} source={Images.info} />
          <CustomText
            size={16}
            color={Colors.lightGrey}
            text={strings.forcancelation}
            style={{width: screenWidth / 1.3, textAlign: 'left'}}
          />
        </View>
        <CustomText
          size={19}
          text={strings.serviceRequired}
          style={{textAlign: 'left'}}
        />
        <CustomText
          size={15}
          color={Colors.lightGrey}
          text={strings.hair_Cut}
          style={{marginVertical: 5, textAlign: 'left'}}
        />
        <FlatList
          data={services}
          renderItem={({item, index}) => {
            return (
              <ServiceCard
                itemData={item}
                index={index}
                removeService={removeService}
              />
            );
          }}
        />

        <CustomText
          size={19}
          text={strings.youraddress}
          style={{textAlign: 'left'}}
        />
        <View
          style={[
            styles.selectedView,
            {alignItems: 'flex-start', marginVertical: 8},
          ]}>
          <TouchableOpacity
          // onPress={() => navigation.navigate(strings.locationscreen)}
          >
            <Image style={styles.icon} source={Images.edited} />
          </TouchableOpacity>
          <View style={{marginLeft: 15}}>
            <CustomText
              numberOfLines={1}
              size={15}
              text={strings.address_Dummy}
              style={{textAlign: 'left'}}
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
          style={{marginTop: 20, marginBottom: 10, textAlign: 'left'}}
          size={21}
          text={strings.day}
        />
        <FlatList
          data={days}
          horizontal
          contentContainerStyle={{columnGap: 8}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.days(item?.selected)}
                onPress={() => handleSelectedItem(days, index, setDays)}>
                <CustomText
                  size={12}
                  text={item?.day}
                  style={styles.daysText(item?.selected)}
                />
                <View>
                  <CustomText
                    size={15}
                    text={item?.date}
                    style={styles.daysText(item?.selected)}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <CustomText
          style={{marginTop: 20, marginBottom: 10, textAlign: 'left'}}
          size={21}
          text={strings.time}
        />
        <FlatList
          data={time}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.time(item?.selected)}
                onPress={() => handleSelectedItem(time, index, setTime)}>
                <CustomText
                  size={16}
                  text={item?.time}
                  style={styles.timeText(item?.selected)}
                />
              </TouchableOpacity>
            );
          }}
        />
        <View style={{marginRight: 20, marginVertical: 20}}>
          <View style={styles.flexbox}>
            <CustomText size={18} text={strings.travelcost} />
            <View style={styles.flex}>
              <Image
                style={[styles.icon, {marginRight: 5}]}
                source={Images.dollar}
              />
              <CustomText size={15} text={strings.riyal28} />
            </View>
          </View>
          <View style={styles.flexbox}>
            <CustomText size={18} text={strings.total_Duration} />
            <View style={styles.flex}>
              <Image
                style={[styles.icon, {marginRight: 5}]}
                source={Images.duration}
              />
              <CustomText size={15} text={strings.hour} />
            </View>
          </View>
          <View style={styles.flexbox}>
            <CustomText size={18} text={strings.total_Cost} />
            <View style={styles.flex}>
              <Image
                style={[styles.icon, {marginRight: 5}]}
                source={Images.dollar}
              />
              <CustomText size={15} text={strings.riyal28} />
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Image
              style={{marginRight: 7, marginTop: 10}}
              source={Images.info}
            />
            <CustomText
              size={15}
              color={Colors.lightGrey}
              text={strings.cancelbooking}
              style={{textAlign: 'left'}}
            />
          </View>
        </View>
        <View style={styles.button}>
          <CustomButton
            onPress={() => navigation.navigate(strings.managePaymentScreen)}
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
  days: isSelected => ({
    borderWidth: 1,
    backgroundColor: isSelected ? Colors.primary : Colors.white,
    borderColor: Colors.grey100,
    borderRadius: 100,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 2,
  }),
  daysText: isSelected => ({
    color: isSelected ? Colors.white : Colors.black,
  }),
  time: isSelected => ({
    borderWidth: 1,
    borderColor: Colors.grey100,
    backgroundColor: isSelected ? Colors.primary : Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginRight: 8,
  }),
  timeText: isSelected => ({
    color: isSelected ? Colors.white : Colors.black,
  }),
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
