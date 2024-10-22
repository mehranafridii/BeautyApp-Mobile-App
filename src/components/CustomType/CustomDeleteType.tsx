import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../utils/colors/colors';
import {screenWidth} from '../../utils/dimensions';
import {Images} from '../../assets/images';
import {CustomTypePropsTypes} from './types';
import strings from '../../utils/strings/strings';

const CustomDeleteType: FC<CustomTypeDeletePropsTypes> = ({
  item,
  title,
  description,
  textName,
  path,
  rate,
  onPressDelete,
  bgColor,
}) => {
  console.log(item, 'skjdfkdsjkdfsj');
  return (
    <View
      onPress={() => onPress(item)}
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
        <TouchableOpacity onPress={() => onPressDelete()}>
          <Image source={Images.trash} style={{marginHorizontal: 10}} />
        </TouchableOpacity>
        <View style={{gap: 8}}>
          <Text
            style={{
              color: Colors.black,
              fontWeight: 'bold',
              textAlign: 'left',
            }}>
            {description}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.duration}
              tintColor={'black'}
              style={{marginRight: 10}}
            />
            <Text style={{color: Colors.lightGrey, fontWeight: 'semi'}}>
              {description}
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          padding: 10,
          color: Colors.lightGrey,
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
        }}>
        {rate || 0.0}
        {strings.rs}
      </Text>
    </View>
  );
};

export default CustomDeleteType;

const styles = StyleSheet.create({});
