import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import {TextWithImagePropTypes} from './types';

const TextWithImage: FC<TextWithImagePropTypes> = ({
  path,
  text,
  size,
  alignSelf,
  textColor,
  fontWeight,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: alignSelf || null,
      }}>
      <CustomText
        text={text}
        size={size || 12}
        fontWeight={fontWeight || '500'}
        color={textColor || Colors.lightGrey}
      />
      <Image source={path} style={{marginLeft: 5}} />
    </View>
  );
};

export default TextWithImage;

const styles = StyleSheet.create({});
