import {Image, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import {AtristDetailPropsTypes} from './types';
import {Colors} from '../../utils/colors/colors';

const ArtistDetail: FC<AtristDetailPropsTypes> = ({
  image,
  heading,
  time,
  distance,
  desc,
  address,
}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.heart} source={Images.heart2} />
      <Image source={image} />
      <View style={styles.rating}>
        <CustomText text={'4.8 (1k+ مراجعة)'} />
        <Image style={{marginLeft: 3}} source={Images.star} />
      </View>
      <View style={{paddingHorizontal: 10}}>
        <CustomText style={{marginTop: 9}} size={20} text={heading} />
        <CustomText color={Colors.lightGrey} size={18} text={desc} />
        <View
          style={{
            borderTopWidth: 1,
            borderColor: Colors.grey100,
            marginVertical: 6,
          }}
        />
        <View>
          <View style={styles.footer}>
            <Image source={Images.location} />
            <CustomText color={Colors.lightGrey} size={16} text={address} />
          </View>
          <View style={styles.footer}>
            <Image source={Images.clock} />
            <CustomText color={Colors.lightGrey} size={15} text={distance} />
            <View style={styles.dot} />
            <CustomText color={Colors.lightGrey} size={15} text={time} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ArtistDetail;

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 102,
    left: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  dot: {
    backgroundColor: Colors.lightGrey,
    height: 5,
    width: 5,
    borderRadius: 99,
    marginHorizontal: 5,
  },
  container: {
    marginBottom: 20,
    borderWidth: 0.5,
    borderRadius: 16,
    borderColor: Colors.grey100,
    paddingBottom: 7,
    backgroundColor: Colors.white,
  },
  heart: {position: 'absolute', zIndex: 1, left: 10, top: 10},
});
