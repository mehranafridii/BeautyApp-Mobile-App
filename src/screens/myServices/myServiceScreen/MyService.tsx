import React, {useCallback, useRef, useState} from 'react';
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
import Utility from '../../../utils/utility/Utility';
const MyService = ({navigation}: {navigation: any}) => {
  //API intialization
  const [artistGetMyServices, {isLoading}] = useLazyArtistGetMyServicesQuery();
  // States
  const [myServiceData, setMyServiceData] = useState([]);
  const [sheetData, setSheetData] = useState([]);
  const bottomSheetRef = useRef<RBSheet>(null);

  const openBottomSheet = (data: any) => {
    setSheetData(myServiceData[data]);
    bottomSheetRef?.current?.open();
  };

  useFocusEffect(
    useCallback(() => {
      ArtistGetMyServicesAPI();
    }, []),
  );
  const ArtistGetMyServicesAPI = () => {
    artistGetMyServices('')
      .unwrap()
      .then(response => {
        const {data} = response;
        const dataNow = Utility.myServicesDataFormat(data);
        setMyServiceData(dataNow);
        console.log(dataNow, 'sfsdfnNNNNN');
      });
  };
  console.log(sheetData, 'DJFKDFKDSHETTDAT');
  const services = Object.keys(myServiceData);
  console.log(myServiceData, 'MYSErvie', myServiceData?.data?.length);
  // Main Return
  return (
    <View style={styles.container}>
      <Header heading={strings?.myServices} />
      <ScrollView
        contentContainerStyle={
          services?.length > 0
            ? styles.serviceContainer
            : styles.centeredContainer
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {services?.length > 0 ? (
          services?.map(item => (
            <CustomeType
              item={item}
              text={`${myServiceData[item]?.length}  ${strings.types}`}
              textName={item}
              onPress={openBottomSheet}
            />
          ))
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
      </ScrollView>
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
        <View>
          <CustomText
            text={strings.selectHairCut}
            size={18}
            style={{alignSelf: 'center'}}
          />
          {/* </TouchableOpacity> */}
          {/* <View style={styles.divider} /> */}
          <ScrollView
            // style={styles.flex}
            contentContainerStyle={styles.sheetScrollContainer}>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
            {sheetData?.map(item => (
              <CustomeType
                text={`${item?.rates}  ${strings.$} `}
                textName={item?.title}
                path={Images.plus}
              />
            ))}

            <View style={{marginTop: 20}}>
              <FooterTwoButton
                textLeft={strings.cancle}
                onPressLeft={() => bottomSheetRef?.current?.close()}
                onPressRight={() => {
                  bottomSheetRef?.current?.close(),
                    navigation.navigate(strings.addServices, {
                      categoryType: sheetData[0]?.service,
                    });
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
  serviceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  button: {width: '80%', marginVertical: 10},
  buttonStyle: {width: 20, height: 20},
  sheetScrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
