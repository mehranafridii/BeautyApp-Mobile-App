import React, {useCallback, useRef} from 'react';
import strings from '../../../utils/strings/strings';
import Header from '../../../components/header/Header';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import ButtonWithImage from '../../../components/buttonWithImage/ButtonWithImage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useLazyArtistGetMyServicesQuery} from '../../../Redux/services/app/AppApi';
import CustomeType from '../../../components/CustomType/CustomeType';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import FooterTwoButton from '../../../components/footerTwoButton/FooterTwoButton';
const MyService = ({navigation}: {navigation: any}) => {
  const bottomSheetRef = useRef<RBSheet>(null);

  const openBottomSheet = () => {
    bottomSheetRef?.current?.open();
  };
  const [artistGetMyServices, {data: myServiceData}] =
    useLazyArtistGetMyServicesQuery();
  useFocusEffect(
    useCallback(() => {
      ArtistGetMyServicesAPI();
    }, []),
  );
  const ArtistGetMyServicesAPI = () => {
    artistGetMyServices('').unwrap();
  };
  console.log(myServiceData, 'MYSErvie', myServiceData?.data?.length);
  return (
    <View style={styles.container}>
      <Header heading={strings?.myServices} />
      <View style={styles.centeredContainer}>
        {myServiceData?.data?.length ? (
          <FlatList
            contentContainerStyle={{paddingBottom: 60}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={myServiceData?.data || []}
            renderItem={({item, index}) => (
              <CustomeType
                text={strings.type08}
                textName={item?.service}
                onPress={openBottomSheet}
              />
            )}
          />
        ) : (
          <>
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
          </>
        )}

        <ButtonWithImage
          text={strings.addService}
          fontWeihgt="900"
          imageStyle={styles.buttonStyle}
          width={screenWidth / 1.6}
          borderRadius={30}
          paddingVerticel={10}
          onPress={() => navigation.navigate('AddServicesSelected')}
        />
      </View>
      {/* Sheet Component Below */}
      <RBSheet
        ref={bottomSheetRef}
        height={screenHeight / 1.3}
        openDuration={500}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        closeOnPressMask={true}
        animationType="slide"
        customStyles={{
          draggableIcon: {
            backgroundColor: Colors.grey100,
            width: screenWidth / 4,
          },
        }}>
        <View style={styles.flex}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <CustomText text={strings.selectHairCut} size={18} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <ScrollView style={styles.flex} contentContainerStyle={styles.scroll}>
            <TouchableOpacity
              activeOpacity={strings.buttonopacity}
              style={styles.contentContainer}>
              <View style={styles.row}>
                <TouchableOpacity style={{marginRight: 20}}>
                  <Image source={Images.trash} />
                </TouchableOpacity>
                <View>
                  <CustomText size={20} text={strings.mohawk} />
                  <View style={styles.row}>
                    <Image
                      style={{tintColor: Colors.black, marginRight: 3}}
                      source={Images.duration}
                    />
                    <CustomText
                      color={Colors.lightGrey}
                      size={14}
                      text={strings.onehour}
                    />
                  </View>
                </View>
              </View>
              <CustomText size={18} text={strings.riyal28} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={strings.buttonopacity}
              style={styles.contentContainer}>
              <View style={styles.row}>
                <TouchableOpacity style={{marginRight: 20}}>
                  <Image source={Images.trash} />
                </TouchableOpacity>
                <View>
                  <CustomText size={20} text={strings.mohawk} />
                  <View style={styles.row}>
                    <Image
                      style={{tintColor: Colors.black, marginRight: 3}}
                      source={Images.duration}
                    />
                    <CustomText
                      color={Colors.lightGrey}
                      size={14}
                      text={strings.onehour}
                    />
                  </View>
                </View>
              </View>
              <CustomText size={18} text={strings.riyal28} />
            </TouchableOpacity>
            <CustomeType
              text={strings.dollar24}
              textName={strings.crew_cut}
              path={Images.plus}
            />
            <View style={{marginTop: screenHeight * 0.3}}>
              <FooterTwoButton
                textLeft={strings.cancle}
                onPressLeft={() => bottomSheetRef?.current?.close()}
                onPressRight={() => {
                  bottomSheetRef?.current?.close(),
                    navigation.navigate(strings.addServices);
                }}
                textRight={strings.addtype}
              />
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  );
};

export default MyService;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  textStyle: {color: Colors.black, fontWeight: 'bold', marginVertical: 20},
  loriumText: {color: Colors.black, fontWeight: 'bold', textAlign: 'center'},
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  button: {width: '80%', marginVertical: 10},
  buttonStyle: {width: 20, height: 20},
});
