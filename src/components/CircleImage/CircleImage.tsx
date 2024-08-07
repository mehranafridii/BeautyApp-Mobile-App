import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import {useNavigation} from '@react-navigation/native';
import strings from '../../utils/strings/strings';
import Utility from '../../utils/utility/Utility';

const CircleImage = ({text, image}: {text?: any; image?: any}) => {
  const navigation: any = useNavigation();
  const _image = Utility.getImageUrl(image);
  console.log(_image, '_image');
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(strings.addServices, {categoryType: text})
      }
      style={styles.containerStyle}>
      <Image source={{uri: _image}} width={86} height={86} borderRadius={100} />
      <CustomText text={text} style={{margin: 12}} />
    </TouchableOpacity>
  );
};

export default CircleImage;

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    flex: 1,
  },
});
