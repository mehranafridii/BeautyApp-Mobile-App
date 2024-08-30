import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../../../utils/colors/colors';
import strings from '../../../../utils/strings/strings';
import Header from '../../../../components/header/Header';
import CustomText from '../../../../components/text/CustomText';
import {screenHeight, screenWidth} from '../../../../utils/dimensions';
import TextWithImage from '../../../../components/textWithImage/TextWithImage';
import {Images} from '../../../../assets/images';
import FooterTwoButton from '../../../../components/footerTwoButton/FooterTwoButton';
import NewBookingRequest from '../../../../components/bookingScreenComponent/NewBookingRequest';
import PersonWithPrice from '../../../../components/bookingScreenComponent/PersonWithPrice';
import CostPrice from '../../../../components/bookingScreenComponent/CostPrice';
import DurationHours from '../../../../components/bookingScreenComponent/DurationHours';
import {useNavigation} from '@react-navigation/native';
interface BookingDetailProps {
  navigation: any;
  route: any;
}
const BookingDetails: FC<BookingDetailProps> = ({navigation, route}) => {
  const {bookingDetail} = route?.params;
  console.log(bookingDetail, 'jdsfkdsfjkds');
  //Main Return
  return (
    <View style={styles.container}>
      <Header heading={strings?.booking_Detail} />
      <NewBookingRequest route={route?.params} />
      <View style={styles.paddingCommon}>
        <CustomText
          text={strings.booking_Detail}
          size={14}
          style={{textAlign: 'left'}}
        />
        <TextWithImage
          path={Images.location_Mark}
          text={bookingDetail?.address}
          size={14}
          alignSelf={'flex-start'}
        />
        <View style={styles.divider} />
      </View>
      <View style={styles.paddingCommon}>
        <View style={styles.distance}>
          <Image source={Images.send} resizeMode="contain" />
          <TextWithImage
            path={Images.running}
            text={strings.threeKm}
            textColor={Colors.black}
            size={14}
            alignSelf={'flex-end'}
          />
        </View>
        <View style={styles.divider} />
      </View>
      <View style={styles.paddingCommon}>
        {/* Service Below */}
        <CustomText
          text={strings.service_detial}
          size={14}
          style={{textAlign: 'left'}}
        />
        <View style={{marginVertical: 10}}>
          <CustomText
            text={strings.buzz_cut}
            size={14}
            color={Colors.lightGrey}
            style={{textAlign: 'left'}}
          />
        </View>
      </View>
      <PersonWithPrice marginVerticle={10} textName={strings.side_part} />
      <PersonWithPrice textName={strings.side_part} />
      <CostPrice textName={strings.travel_Cost} marginTop={10} />

      <DurationHours />
      <CostPrice textName={strings.total_Cost} />

      <View style={styles.footer}>
        <FooterTwoButton
          onPressRight={() =>
            navigation.navigate(
              route?.params?.cancle
                ? strings.bookingAccepted
                : strings.getDirection,
            )
          }
          marginTop={screenHeight / 16}
          textRight={'ابدأ الآن'}
          textLeft={'إلغاء الحجز'}
        />
      </View>
    </View>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey100,
    width: screenWidth / 1.5,
    marginVertical: 15,
  },
  paddingCommon: {
    paddingHorizontal: '8%',
  },
  footer: {marginHorizontal: '5%'},
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
