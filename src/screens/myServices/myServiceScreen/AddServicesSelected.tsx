import {StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import CustomText from '../../../components/text/CustomText';
import CircleImage from '../../../components/CircleImage/CircleImage';
import CustomButton from '../../../components/button/CustomButton';
import {screenHeight, screenWidth} from '../../../utils/dimensions';

const AddServicesSelected = () => {
  return (
    <View style={styles.container}>
      <Header heading={strings?.addService} />
      <View style={styles.innerContainer}>
        <CustomText
          text={strings.services}
          style={styles.serviceText}
          size={14}
        />
        <View style={styles.rowCon}>
          <CircleImage text={strings.haircut} />
          <CircleImage text={strings.makeup} />
          <CircleImage text={strings.shaving} />
        </View>
        <View style={styles.rowCon}>
          <CircleImage text={strings.hairdry} />
          <CircleImage text={strings.massage} />
          <CircleImage text={strings.henna} />
        </View>
        <View style={styles.rowCon}>
          <CircleImage text={strings.nailcare} />
          <CircleImage text={strings.feetcare} />
          <CircleImage text={strings.skincare} />
        </View>
        <View style={{marginTop: screenHeight / 10}}>
          <CustomButton
            text={strings.next}
            style={{width: screenWidth / 1.1}}
          />
        </View>
      </View>
    </View>
  );
};

export default AddServicesSelected;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  rowCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceText: {textAlign: 'left'},
  innerContainer: {padding: 15},
});
