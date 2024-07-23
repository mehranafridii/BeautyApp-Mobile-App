import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import CustomInput from '../../../components/input/CustomInput';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import CustomButton from '../../../components/button/CustomButton';
import SocialButton from '../../../components/socialButton/SocialButton';
import {Images} from '../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {useLoginMutation} from '../../../Redux/services/auth/AuthApi';
import {setDataInLocalStorage} from '../../../utils/mmkv/MMKV';
import {MMKV_KEYS} from '../../../constants/MMKV_KEY';
import AppToast from '../../../components/appToast/AppToast';
import Utility from '../../../utils/utility/Utility';
import {useDispatch, useSelector} from 'react-redux';
import {getUserType, setUserType} from '../../../Redux/Reducers/UserTypeSlice';
import {changeStack} from '../../../navigators/NavigationService';

const Login = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const userType = useSelector(getUserType);
  // API initialization
  const [loginApi, {isLoading}] = useLoginMutation();
  const [inputsDetails, setinputsDetails] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const handleLogin = async () => {
    const keys = Object.keys(inputsDetails);
    const validate = Utility.loginValidation(inputsDetails, handleErrors);
    if (validate === true) {
      const formData = new FormData();
      for (let i of keys) {
        formData.append(i, inputsDetails[i]);
      }
      await loginApi(formData)
        .unwrap()
        .then(response => {
          if (response?.data) {
            const userRole =
              Number(response?.data?.role) === 0 ? 'user' : 'business';
            dispatch(setUserType(userRole));
            setDataInLocalStorage(MMKV_KEYS.AUTH_TOKEN, response?.data?.token);
            setDataInLocalStorage(MMKV_KEYS.USER_DATA, response?.data);
            console.log(userRole, 'USERLOGIROLE');
            changeStack('AppStack');
          }
        })
        .catch(errorResponse => {
          const {data} = errorResponse?.data;
          const {error} = data;
          AppToast({type: 'error', message: error});
        });
    }
    // navigation.navigate(strings.locationscreen);
  };
  // Functions
  const handleInputs = (key: string) => (error: string) => (value: string) => {
    setinputsDetails(prevState => ({...prevState, [key]: value}));
    handleErrors(error, key);
  };
  const handleErrors = (errorMessage: string, input: string) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  // main return
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <CustomText size={26} style={styles.login} text={strings?.signin} />
          <CustomText
            size={14}
            style={styles.welcome}
            color={Colors.lightGrey}
            text={strings?.welcomeback}
          />
          <CustomInput
            placeholder={strings.email}
            label={strings.email}
            onChangeText={handleInputs('email')('')}
            errorIndicator={errors.email}
          />
          <CustomInput
            style={styles.password}
            placeholder={strings.password}
            password={true}
            label={strings.password}
            onChangeText={handleInputs('password')('')}
            errorIndicator={errors.password}
          />
          <CustomText
            style={styles.forget}
            color={Colors.primary}
            text={strings?.forgotpassword}
          />
          <CustomButton
            onPress={() => handleLogin()}
            text={strings.signin}
            isLoader={isLoading}
          />
          <View style={styles.orsign}>
            <View style={styles.divider} />
            <CustomText
              style={{marginHorizontal: 8}}
              color={Colors.lightGrey}
              text={strings?.orsignin}
            />
            <View style={styles.divider} />
          </View>
          <View style={styles.social}>
            <SocialButton icon={Images.google} />
            <SocialButton icon={Images.fb} />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                userType === 'user' ? strings.signupUser : strings.signupArtist,
              )
            }
            activeOpacity={strings.buttonopacity}>
            <CustomText text={strings?.donthaveacc} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  login: {
    marginTop: screenHeight * 0.13,
  },
  welcome: {
    marginTop: 8,
    marginBottom: '15%',
  },
  password: {
    marginTop: 22,
  },
  forget: {
    alignSelf: 'flex-start',
    marginRight: 30,
    textDecorationLine: 'underline',
    marginTop: 8,
    marginBottom: '10%',
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
});
