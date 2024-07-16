import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Images} from '../../../assets/images';
import {Colors} from '../../../utils/colors/colors';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import CustomButton from '../../../components/button/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {typeStore} from '../../../Redux/Actions/TypeStoreAction';

const Welcome = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const setUserType = (type: 'business' | 'user') => {
    if (type === 'business') {
      dispatch(typeStore(type));
      navigation.navigate(strings.signupscreen);
    } else if (type === 'user') {
      dispatch(typeStore(type));
      navigation.navigate('UserStack', {screen: strings.signupscreen});
    }
  };

  return (
    <ImageBackground style={styles.container} source={Images.welcome}>
      <View style={styles.contentContainer}>
        <CustomText fontWeight="700" size={18} text={strings.onlywomen} />
        <CustomText
          style={styles.registerText}
          size={15}
          text={strings.register}
        />
        <CustomButton
          onPress={() => setUserType('business')}
          style={styles.button}
          text={strings.bussiness}
        />
        <CustomButton
          onPress={() => setUserType('user')}
          style={styles.button}
          bgColor="transparent"
          text={strings.user}
          textColor={Colors.black}
          borderWidth={1}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(strings.loginscreen)}
          activeOpacity={strings?.buttonopacity}>
          <CustomText size={15} text={strings.alreadyhaveacc} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={strings.buttonopacity}
          onPress={() => navigation.navigate(strings.locationscreen)}
          style={styles.skip}>
          <CustomText color={Colors.lightGrey} size={14} text={strings?.skip} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: 28,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  registerText: {
    marginTop: '8%',
    marginBottom: '3%',
  },
  button: {marginBottom: 16},
  skip: {
    marginTop: 12,
    marginBottom: 16,
  },
});
