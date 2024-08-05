import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../../utils/colors/colors';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import CustomeType from '../../../components/CustomType/CustomeType';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import ButtonWithImage from '../../../components/buttonWithImage/ButtonWithImage';
import React, {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from '../../../components/text/CustomText';
import {Images} from '../../../assets/images';
import FooterTwoButton from '../../../components/footerTwoButton/FooterTwoButton';
import {useNavigation} from '@react-navigation/native';
const Services = () => {
  const bottomSheetRef = useRef<RBSheet>(null);
  const navigation: any = useNavigation();
  const openBottomSheet = () => {
    bottomSheetRef?.current?.open();
  };

  return (
    <View style={styles.container}>
      <Header heading={strings?.myServices} />
      <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
        <CustomeType
          text={strings.type20}
          textName={strings.hair_Cut}
          onPress={openBottomSheet}
        />
        <CustomeType text={strings.type12} textName={strings.hair_Coloring} />
        <CustomeType text={strings.type08} textName={strings.hair_Wash} />
        <View style={{alignItems: 'center'}}>
          <ButtonWithImage
            fontWeihgt="900"
            imageStyle={styles.buttonStyle}
            width={screenWidth / 1.1}
            borderRadius={30}
            paddingVerticel={10}
            // onPress={() => navigation.navigate(strings.addServices)}
            onPress={() => Alert.alert('Adding Services Flow')}
            text={strings.addService}
          />
        </View>
      </ScrollView>
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

export default Services;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  divider: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1.5,
  },

  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
  },
  flex: {flex: 1},
  buttonStyle: {width: 20, height: 20},
  row: {flexDirection: 'row', alignItems: 'center'},
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.grey100,
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  scroll: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 5,
  },
});
