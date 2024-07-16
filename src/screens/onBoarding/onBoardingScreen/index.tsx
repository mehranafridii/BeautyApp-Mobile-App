import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import strings from '../../../utils/strings/strings';
import Slick from 'react-native-slick';
import {Images} from '../../../assets/images';
import {onBoardingData} from '../../../utils/dummyData';
import CustomText from '../../../components/text/CustomText';
import {useNavigation} from '@react-navigation/native';

const OnBoarding = () => {
  const navigation: any = useNavigation();
  const [index, setIndex] = useState(0);
  const next = () => {
    if (index < 2) {
      setIndex(index + 1);
    } else {
      navigation.navigate(strings.welcomescreen);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={strings.buttonopacity}
        onPress={() => navigation.navigate(strings.welcomescreen)}
        style={styles.skip}>
        <CustomText size={13} text={strings?.skip} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Slick
          loop={false}
          index={index}
          scrollEnabled={false}
          dotStyle={styles.dot}
          activeDotStyle={styles.activedot}
          paginationStyle={{flexDirection: 'row-reverse'}}
          showsButtons={false}>
          {onBoardingData?.map((item, index) => {
            return (
              <View style={styles.map} key={index}>
                <Image style={{borderRadius: 8}} source={item?.img} />
                <CustomText
                  style={styles.heading}
                  size={25}
                  fontWeight="700"
                  text={item.heading}
                />
                <CustomText
                  size={15}
                  color={Colors.lightGrey}
                  style={styles.description}
                  text={item.desc}
                />
              </View>
            );
          })}
        </Slick>
        <TouchableOpacity
          activeOpacity={strings.buttonopacity}
          onPress={next}
          style={styles.button}>
          <Image style={{resizeMode: 'center'}} source={Images.rightarrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  skip: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingRight: 20,
  },
  content: {flex: 1, marginBottom: '10%'},
  dot: {right: 120, width: 9, height: 9, borderRadius: 99},
  activedot: {
    right: 120,
    width: 14,
    height: 14,
    borderRadius: 99,
    backgroundColor: Colors.primary,
  },
  map: {alignItems: 'center', marginTop: 25},
  heading: {
    marginTop: '17%',
  },
  description: {
    marginTop: 15,
    textAlign: 'center',
    marginHorizontal: 34,
  },
  button: {position: 'absolute', bottom: 15, left: 25},
});
