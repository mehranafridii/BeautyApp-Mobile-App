import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import CustomText from '../../../components/text/CustomText';
import DottedBorder from '../../../components/dottedBorder/DottedBorder';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomInput from '../../../components/input/CustomInput';
import CustomButton from '../../../components/button/CustomButton';
import {useNavigation} from '@react-navigation/native';

const AddServices = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Header heading={strings?.enteryourlocation} />
      <ScrollView style={styles.scroolViewPadding}>
        <CustomText text={strings?.add_Service_Photos} size={14} />
        <CustomText
          text={strings?.lorem_ipsum}
          size={14}
          color={Colors.lightGrey}
        />
        <View style={styles.dottedBorderContainer}>
          <DottedBorder width={screenWidth / 5.3} height={screenHeight / 11} />
          <DottedBorder width={screenWidth / 5.3} height={screenHeight / 11} />
          <DottedBorder width={screenWidth / 5.3} height={screenHeight / 11} />
          <DottedBorder width={screenWidth / 5.3} height={screenHeight / 11} />
        </View>
        <CustomInput
          width={screenWidth / 1.1}
          paddingBottom={45}
          heigth={screenHeight / 10}
          placeholder={strings.add_Service_Description}
          placeHolderTextColor={Colors.black}
          label={strings.service_Description}
        />
        <CustomText
          style={styles.text}
          size={14}
          color={Colors.black}
          text={strings.add_Title_and_Rates}
        />
        <CustomInput
          style={styles.inputMargin}
          width={screenWidth / 1.1}
          placeholder={strings.faux_hawk}
          label={strings.title}
          placeHolderTextColor={Colors.black}
        />
        <CustomInput
          style={styles.inputMargin}
          width={screenWidth / 1.1}
          placeholder={strings.SR_24}
          label={strings.rates}
          placeHolderTextColor={Colors.black}
        />
        <CustomInput
          style={styles.inputMargin}
          width={screenWidth / 1.1}
          placeholder={strings.zero_One}
          label={strings.duration_Time}
          placeHolderTextColor={Colors.black}
        />
        <CustomText
          style={styles.addMoreText}
          size={14}
          color={Colors.primary}
          fontWeight="900"
          text={strings.add_More_Types}
        />
        <CustomText
          size={14}
          color={Colors.black}
          text={strings.payment_Mode}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            text={strings.Cash}
            style={styles.cashButton}
            paddingVerticle={5}
          />
          <CustomButton
            text={strings.credit_Card}
            textColor={Colors.lightGrey}
            bgColor={Colors.lightWhite}
            paddingVerticle={5}
            style={{
              width: screenWidth / 3.8,
            }}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <CustomButton
            style={styles.button}
            text={strings.next}
            onPress={() => navigation.navigate(strings?.Services)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddServices;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  dottedBorderContainer: {flexDirection: 'row', alignItems: 'center'},
  text: {
    marginVertical: '3%',
  },
  scroolViewPadding: {padding: 15},
  addMoreText: {
    textAlign: 'center',
  },
  button: {width: '100%', marginVertical: 10},
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cashButton: {width: screenWidth / 5, margin: 5},
  inputMargin: {marginVertical: 8},
});
