import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import {useNavigation} from '@react-navigation/native';
import strings from '../../utils/strings/strings';

const CircleImage = ({text, image}: {text?: any; image?: any}) => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(strings.addServices, {categoryType: text})
      }
      style={{margin: 12, alignItems: 'center'}}>
      <Image source={image} />
      <CustomText text={text} style={{margin: 12}} />
    </TouchableOpacity>
  );
};

export default CircleImage;

const styles = StyleSheet.create({});
