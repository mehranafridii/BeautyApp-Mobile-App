import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../utils/colors/colors';
import {screenWidth} from '../../utils/dimensions';
import {Images} from '../../assets/images';
import {CustomTypePropsTypes} from './types';
import strings from '../../utils/strings/strings';

const CustomeType: FC<CustomTypePropsTypes> = ({
  text,
  textName,
  path,
  onPress,
  bgColor,
}) => {
  return (
    <View
      style={{
        borderColor: Colors.grey100,
        backgroundColor: bgColor || 'transaparent',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        width: screenWidth / 1.12,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={strings.buttonopacity}
          onPress={onPress}>
          <Image
            source={path || Images.arrow_right}
            style={{marginHorizontal: 10}}
          />
        </TouchableOpacity>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>{text}</Text>
      </View>
      <Text style={{padding: 10, color: Colors.lightGrey}}>{textName}</Text>
    </View>
  );
};

export default CustomeType;

const styles = StyleSheet.create({});
