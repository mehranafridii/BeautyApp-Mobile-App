import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../utils/colors/colors';
import {screenWidth} from '../../utils/dimensions';
import strings from '../../utils/strings/strings';
import FooterTwoButton from '../footerTwoButton/FooterTwoButton';
import {Images} from '../../assets/images';
import TextWithImage from '../textWithImage/TextWithImage';
import CustomText from '../text/CustomText';
import ToggleButton from '../toggle/ToggleButton';
import {ProfileDetailBoxPropsTypes} from './types';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../button/CustomButton';
const ProfileDetailBox: FC<ProfileDetailBoxPropsTypes> = ({
  itemData,
  dateText,
  hideToggle,
  isOn,
  image,
  onPress,
  onToggle,
}) => {
  const navigation: any = useNavigation();
  const handlePress = () => {
    navigation.navigate(strings.bookingDetails_screen, {
      bookingDetail: itemData,
    });
  };
  // Destructuring Data
  const {
    date,
    address,
    starttime,
    endtime,
    status,
    travelcost,
    total_price,
    id,
    artist,
  } = itemData || {};

  return (
    <View style={styles.boxContainer}>
      <View style={styles.toggleContainer}>
        {hideToggle ? (
          <Text style={{color: 'transparent'}}></Text>
        ) : (
          <ToggleButton
            labelText={strings.remind_Me}
            onToggle={onToggle}
            isOn={isOn}
          />
        )}
        <CustomText text={`${date} - ${starttime}`} />
      </View>
      <View style={styles.divider} />

      <View style={styles.detailContainer}>
        <View style={styles.nameContainer}>
          <CustomText text={artist} size={14} style={{textAlign: 'right'}} />
          <TextWithImage path={Images.location_Mark} text={strings.g85} />
          <TextWithImage path={Images.check_Image} text={strings.service_id} />
        </View>
        <Image style={{marginHorizontal: 10}} source={image} />
      </View>
      <View style={styles.divider} />
      {hideToggle ? (
        <CustomButton style={styles.button} text={strings.view_Detail} />
      ) : (
        <FooterTwoButton
          onPressRight={handlePress}
          marginTop={5}
          textRight={strings.view_Detail}
          textLeft={strings.cancle}
        />
      )}
    </View>
  );
};

export default ProfileDetailBox;

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 0.5,
    padding: 10,
    marginHorizontal: 10,
    marginTop: '7%',
  },
  button: {width: '100%', marginVertical: 10, marginRight: 10},

  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightGrey,
    width: screenWidth / 1.35,
    margin: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  nameContainer: {
    marginBottom: 10,
    marginRight: 5,
  },
});
