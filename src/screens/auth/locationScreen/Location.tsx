import {
  BackHandler,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../../assets/images';
import {Colors} from '../../../utils/colors/colors';
import {screenHeight} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import CustomButton from '../../../components/button/CustomButton';
import CustomInput from '../../../components/input/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Location = () => {
  const checkType = useSelector((state: any) => state?.Type_Reducer);
  const navigation: any = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Pear', value: 'pear'},
  ]);

  return (
    <View style={styles.container}>
      <Image
        style={{marginTop: screenHeight * 0.09}}
        source={Images.currentloc}
      />

      <CustomText
        size={24}
        fontWeight="bold"
        style={{marginTop: 25}}
        text={strings.whatloction}
      />
      <CustomText
        color={Colors.lightGrey}
        style={{marginVertical: 15}}
        text={strings.needlocation}
      />
      <CustomInput
        value={value}
        setValue={setValue}
        open={open}
        setOpen={setOpen}
        items={items}
        setItems={setItems}
        dropdownPlaceholder={strings.allcities}
        label={strings.selectcity}
        dropdown={true}
      />
      <CustomButton
        onPress={() => {
          checkType == 'user'
            ? navigation.navigate('UserStack', {
                screen: strings.user_Bottom_Stack,
              })
            : navigation.navigate(strings.uploaddocsscreen);
        }}
        style={{marginTop: 20}}
        text={strings.allowloc}
      />
      {checkType == 'user' && (
        <TouchableOpacity
          onPress={() => navigation.navigate(strings.manuallocationscreen)}
          activeOpacity={strings.buttonopacity}>
          <CustomText
            size={18}
            color={Colors.primary}
            style={{marginTop: 15}}
            text={strings.enterlocman}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
});
