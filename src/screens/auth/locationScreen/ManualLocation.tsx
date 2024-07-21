import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Images} from '../../../assets/images';
import {Colors} from '../../../utils/colors/colors';
import {screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUserType} from '../../../Redux/Reducers/UserTypeSlice';

const ManualLocation = () => {
  const checkType = useSelector(getUserType);

  console.log(checkType, 'kfdjdkfj');
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Header heading={strings?.enteryourlocation} />
      <View style={styles.input}>
        <View style={styles.flex}>
          <Image source={Images.search} />
          <TextInput
            style={styles.textInput}
            placeholder={strings.goldenavnue}
            placeholderTextColor={Colors.lightGrey}
          />
        </View>
        <Image source={Images.cross} />
      </View>
      <View style={styles.currentLocation}>
        <Image style={{marginRight: 10}} source={Images.locationmark} />
        <CustomText size={16} text={strings.usecurrenloc} />
      </View>
      <View style={styles.divider} />
      <View style={{marginLeft: 20, marginTop: 10}}>
        <CustomText color={Colors.lightGrey} text={strings.searchresult} />
        <View style={styles.locContainer}>
          <Image
            style={{marginRight: 5, width: 17, height: 17}}
            source={Images.locationmark}
          />
          <CustomText size={16} text={strings.goldenavnue} />
        </View>
        <TouchableOpacity
          onPress={() => {
            checkType == 'user'
              ? navigation.navigate('UserStack', {
                  screen: strings.user_Bottom_Stack,
                })
              : navigation.navigate(strings.uploaddocsscreen);
          }}>
          <CustomText color={Colors.lightGrey} text={strings.prestonroad} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ManualLocation;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.grey100,
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderRadius: 6,
    marginHorizontal: 20,
    paddingVertical: 10,
    marginTop: 12,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  textInput: {
    marginLeft: 11,
    width: screenWidth / 1.5,
  },
  divider: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1,
    marginHorizontal: 20,
  },
  currentLocation: {flexDirection: 'row', alignItems: 'center', padding: 20},
  locContainer: {
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
