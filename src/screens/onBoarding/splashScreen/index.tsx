import {Image, I18nManager, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import strings from '../../../utils/strings/strings';
import {default as RNRestart} from 'react-native-restart';
import {getDataFromLocalStorage} from '../../../utils/mmkv/MMKV';
import {changeStack} from '../../../navigators/NavigationService';
import {MMKV_KEYS} from '../../../constants/MMKV_KEY';

const Splash = () => {
  const navigation: any = useNavigation();
  useEffect(() => {
    I18nManager.forceRTL(true);
    !I18nManager.isRTL && RNRestart.Restart();
    setTimeout(() => {
      const isToken = getDataFromLocalStorage(MMKV_KEYS?.AUTH_TOKEN);
      isToken
        ? changeStack('AppStack')
        : navigation.replace(strings.onboardingscreen);
      // navigation.navigate(strings.onboardingscreen);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Images.nagsh} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
