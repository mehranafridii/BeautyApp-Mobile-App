import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import strings from '../../../utils/strings/strings';
import Header from '../../../components/header/Header';
import CustomText from '../../../components/text/CustomText';
import TextWithImage from '../../../components/textWithImage/TextWithImage';
import {Images} from '../../../assets/images';
import RadioButton from '../../../components/RadioButton/RadioButton';

const ManagePayment = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRadioButtonPress = (item?: any) => {
    setSelectedItem(item);
  };

  return (
    <View style={styles.container}>
      <Header heading={strings?.paymentmethod} />
      <View style={{padding: 20}}>
        <CustomText text={strings.pay_Cash} size={16} color={Colors.black} />
        <View style={styles.rowContainer}>
          <RadioButton
            selected={selectedItem === strings.Cash}
            onPress={() => handleRadioButtonPress(strings.Cash)}
          />
          <TextWithImage text={strings.Cash} path={Images.money} size={13} />
        </View>
        <CustomText
          text={strings.credit_Debit}
          size={16}
          color={Colors.black}
        />
        <View style={styles.rowContainer}>
          <RadioButton
            selected={selectedItem === strings.add_New_Card}
            onPress={() => handleRadioButtonPress(strings.add_New_Card)}
          />
          <TextWithImage
            text={strings.add_New_Card}
            path={Images.cardblue}
            size={13}
          />
        </View>
      </View>
    </View>
  );
};

export default ManagePayment;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  rowContainer: {
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: Colors.grey100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
