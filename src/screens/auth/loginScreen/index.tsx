import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/colors/colors';
import CustomInput from '../../../components/input/CustomInput';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import CustomButton from '../../../components/button/CustomButton';
import SocialButton from '../../../components/socialButton/SocialButton';
import {Images} from '../../../assets/images';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation: any = useNavigation();
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
          <CustomInput placeholder={strings.email} label={strings.email} />
          <CustomInput
            style={styles.password}
            placeholder={strings.password}
            password={true}
            label={strings.password}
          />
          <CustomText
            style={styles.forget}
            color={Colors.primary}
            text={strings?.forgotpassword}
          />
          <CustomButton
            onPress={() => navigation.navigate(strings.bottomTab)}
            text={strings.signin}
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
            onPress={() => navigation.navigate(strings.signupscreen)}
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
