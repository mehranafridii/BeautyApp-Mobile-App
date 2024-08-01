import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import strings from '../../../utils/strings/strings';
import Header from '../../../components/header/Header';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import ButtonWithImage from '../../../components/buttonWithImage/ButtonWithImage';
import {useNavigation} from '@react-navigation/native';
const MyService = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <Header heading={strings?.myServices} />
      <View style={styles.centeredContainer}>
        <Image source={Images.calendar_clock} />
        <CustomText
          style={styles.textStyle}
          text={strings.noServicesAddedd}
          size={14}
        />
        <CustomText
          style={styles.loriumText}
          text={strings.loriumText}
          size={14}
        />

        <ButtonWithImage
          text={strings.addService}
          fontWeihgt="900"
          imageStyle={styles.buttonStyle}
          width={screenWidth / 1.6}
          borderRadius={30}
          paddingVerticel={10}
          onPress={() => navigation.navigate('AddServices')}
        />
      </View>
    </View>
  );
};

export default MyService;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  textStyle: {color: Colors.black, fontWeight: 'bold', marginVertical: 20},
  loriumText: {color: Colors.black, fontWeight: 'bold', textAlign: 'center'},
  centeredContainer: {
    marginTop: screenHeight / 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  button: {width: '80%', marginVertical: 10},
  buttonStyle: {width: 20, height: 20},
});
