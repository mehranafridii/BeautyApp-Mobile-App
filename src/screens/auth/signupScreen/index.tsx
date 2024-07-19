import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import CustomInput from '../../../components/input/CustomInput';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../../../components/button/CustomButton';
import {screenWidth} from '../../../utils/dimensions';
import SocialButton from '../../../components/socialButton/SocialButton';
import {
  useSignUpArtistMutation,
  useSignUpMutation,
} from '../../../Redux/services/auth/AuthApi';
import AppToast from '../../../components/appToast/AppToast';

const Signup = () => {
  // API initialization
  const [signupArtistApi, {isLoading}] = useSignUpArtistMutation();
  const navigation: any = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Pear', value: 'pear'},
  ]);

  const [inputsDetails, setinputsDetails] = useState({
    name: '',
    business_name: '',
    email: '',
    business_email: '',
    password: ' ',
    password_confirmation: '',
    phone: '',
    category: '1',
    address: '',
    business_brand: '',
    services: '',
    business_payment_account: '',
    gender: 'male',
    dob: '12-09-2015',
    image: 'none',
  });
  const handleSignup = async () => {
    const isFieldsFilled = Object.values(inputsDetails)?.every(
      val => val?.trim('') !== '',
    );
    if (isFieldsFilled) {
      const keys = Object.keys(inputsDetails);
      console.log(keys, 'KEYSHDHF');
      const formData = new FormData();
      for (let i of keys) {
        formData.append(i, inputsDetails[i]);
      }

      console.log(formData, 'jkdsfjkdsjfkƒnnn');
      // return;
      await signupArtistApi(formData)
        .unwrap()
        .then(res => {
          console.log(res, 'skdjfksdjfkdsjf');
          navigation.navigate(strings.locationscreen);
          AppToast({
            type: 'success',
            message: 'Artist Registered Sucessfully',
          });
        })
        .catch(error => {
          console.log(error, 'skdjfkdERR');
        });
    } else {
      AppToast({
        type: 'error',
        message: 'All fields are required',
      });
    }
  };
  // Functions
  const handleInputs = (key: string) => (value: string) => {
    setinputsDetails(prevState => ({...prevState, [key]: value}));
  };
  //Main Return
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Images.back} style={styles.backImage} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <CustomText size={24} text={strings.createacc} />
          <CustomText
            style={styles.text}
            size={13}
            color={Colors.lightGrey}
            text={strings.fillinfo}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.jhon}
            label={strings.name}
            onChangeText={handleInputs('name')}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.num}
            label={strings.phonenum}
            onChangeText={handleInputs('phone')}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.expemail}
            label={strings.email}
            onChangeText={handleInputs('email')}
          />
          <CustomInput
            dropdown
            value={value}
            setValue={setValue}
            open={open}
            setOpen={setOpen}
            items={items}
            setItems={setItems}
            dropdownPlaceholder={strings.selectCategory}
            label={strings.category}
            onChangeText={handleInputs('category')}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.address}
            label={strings.address}
            onChangeText={handleInputs('address')}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.expemail}
            label={strings.businessemail}
            onChangeText={handleInputs('business_email')}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.businessname}
            label={strings.businessname}
            onChangeText={handleInputs('business_name')}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.Businessbrand}
            label={strings.Businessbrand}
            onChangeText={handleInputs('business_brand')}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.services}
            label={strings.services}
            onChangeText={handleInputs('services')}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.ibannum}
            label={strings.businesspayment}
            onChangeText={handleInputs('business_payment_account')}
          />
          <CustomInput
            style={{marginTop: 8}}
            password={true}
            placeholder={strings.pass}
            label={strings.password}
            onChangeText={handleInputs('password')}
          />
          <CustomInput
            style={{marginTop: 8}}
            password={true}
            placeholder={strings.pass}
            label={strings.password}
            onChangeText={handleInputs('password_confirmation')}
          />
          <View style={styles.check}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              boxType={'square'}
              tintColors={{
                true: Colors.primary,
                false: Colors.lightGrey,
              }}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              style={{width: 22, height: 22}}
            />
            <CustomText style={styles.terms} text={strings.agreewithterms} />
          </View>
          <CustomButton onPress={() => handleSignup()} text={strings.signup} />
          <View style={styles.orsign}>
            <View style={styles.divider} />
            <CustomText
              style={{marginHorizontal: 8}}
              color={Colors.lightGrey}
              text={strings?.orsignup}
            />
            <View style={styles.divider} />
          </View>
          <View style={styles.social}>
            <SocialButton icon={Images.google} />
            <SocialButton icon={Images.fb} />
          </View>
          <TouchableOpacity
            style={styles.alreadyText}
            activeOpacity={strings.buttonopacity}>
            <CustomText text={strings?.alreadyhaveacc} />
            <CustomText text={strings?.sign_In} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    // textAlign: 'right',
  },
  contentContainer: {
    paddingTop: 16,
    alignItems: 'center',
  },
  alreadyText: {
    marginBottom: '8%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginVertical: '11%',
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightGrey,
    width: screenWidth / 5,
  },
  orsign: {flexDirection: 'row', alignItems: 'center', marginTop: '12%'},
  social: {
    marginVertical: '8%',
    flexDirection: 'row',
  },
  terms: {
    marginLeft: 6,
  },
  check: {
    marginBottom: '12%',
    marginTop: 10,
    marginLeft: 15,
    alignSelf: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backImage: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
});
