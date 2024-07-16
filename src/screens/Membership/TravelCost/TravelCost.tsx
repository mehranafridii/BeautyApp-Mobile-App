import {StyleSheet, View} from 'react-native';
import React from 'react';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import Header from '../../../components/header/Header';
import CustomInput from '../../../components/input/CustomInput';
import {screenWidth} from '../../../utils/dimensions';
import CustomButton from '../../../components/button/CustomButton';
import {useNavigation} from '@react-navigation/native';

const TravelCost = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Header heading={strings?.travelcost} />
      <View style={styles.contentContainer}>
        <CustomInput
          width={screenWidth / 1.15}
          paddingBottom={10}
          labelSize={14}
          placeholder={strings.sr4}
          placeHolderTextColor={Colors.black}
          label={strings.travel_Cost_PerKilo}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text={strings.save}
          style={{width: '100%'}}
          onPress={() => navigation.navigate(strings.offdays)}
        />
      </View>
    </View>
  );
};

export default TravelCost;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  contentContainer: {flex: 1, paddingHorizontal: 20},
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
