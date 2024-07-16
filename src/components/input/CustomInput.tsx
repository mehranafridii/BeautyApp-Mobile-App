import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import {Images} from '../../assets/images';
import {screenWidth} from '../../utils/dimensions';
import {CustomInputPropsTypes} from './types';
import DropDownPicker from 'react-native-dropdown-picker';
import strings from '../../utils/strings/strings';

const CustomInput: FC<CustomInputPropsTypes> = ({
  password,
  label,
  placeholder,
  style,
  dropdown,
  open,
  value,
  items,
  setOpen,
  setItems,
  setValue,
  dropdownPlaceholder,
  heigth,
  paddingBottom,
  placeHolderTextColor,
  width,
  labelSize,
  changeText,
  onChangeText = () => {},
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={style}>
      <CustomText text={label} size={labelSize} style={styles.labelTestStyle} />
      <View
        style={{
          borderColor: Colors.grey100,
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 7,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          height: heigth || 50,
          width: width || screenWidth / 1.2,
        }}>
        {dropdown ? (
          <View style={{left: 0, position: 'absolute'}}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                borderColor: Colors.grey100,
                width: screenWidth / 1.2,
              }}
              placeholder={dropdownPlaceholder}
              placeholderStyle={{color: Colors.lightGrey}}
              listMode="MODAL"
            />
          </View>
        ) : (
          <TextInput
            style={{
              width: screenWidth / 1.47,
              textAlign: 'right',
              paddingBottom: paddingBottom || null,
              color: Colors.black,
            }}
            secureTextEntry={password && !visible}
            placeholder={placeholder}
            placeholderTextColor={placeHolderTextColor || Colors.lightGrey}
            value={value}
            // onChange={}
            onChangeText={onChangeText}
          />
        )}
        {changeText && (
          <CustomText size={14} color={Colors.primary} text={strings.change} />
        )}
        {password && (
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Image
              style={{width: 25, height: 25}}
              source={visible ? Images?.visible : Images.eye_slash}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  labelTestStyle: {
    textAlign: 'left',
    // backgroundColor: 'red',
  },
});
