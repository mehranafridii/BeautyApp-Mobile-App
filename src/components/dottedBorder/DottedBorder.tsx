import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../utils/colors/colors';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import {DottedBorderPropsTypes} from './types';

const DottedBorder: FC<DottedBorderPropsTypes> = ({
  width,
  text,
  height,
  textColor,
  bgColor,
  marginBottom,
  onPress,
}) => {
  return (
    <TouchableOpacity
      // onPress={() => onPress()}
      style={[
        styles.borderContainer,
        {
          width: width,
          height: height,
          backgroundColor: bgColor || Colors.white,
          marginBottom: marginBottom || 30,
        },
      ]}>
      <View style={styles.imageContainer}>
        <View style={styles.imageView}>
          <Image source={Images.add} style={{width: 30, height: 30}} />
        </View>
        {text && <CustomText color={textColor} size={14} text={text} />}
      </View>
    </TouchableOpacity>
  );
};

export default DottedBorder;

const styles = StyleSheet.create({
  borderContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    // height: 100,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageView: {
    backgroundColor: Colors.primary,
    width: 35,
    height: 35,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
});
