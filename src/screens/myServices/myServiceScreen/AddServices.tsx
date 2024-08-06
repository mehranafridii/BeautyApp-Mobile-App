import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import CustomText from '../../../components/text/CustomText';
import DottedBorder from '../../../components/dottedBorder/DottedBorder';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomInput from '../../../components/input/CustomInput';
import CustomButton from '../../../components/button/CustomButton';

import {useArtistAddServicesMutation} from '../../../Redux/services/app/AppApi';
import ImagePicker from 'react-native-image-crop-picker';
import AppToast from '../../../components/appToast/AppToast';

const AddServices = ({
  navigation,
  route,
}: {
  navigation?: any;
  route?: Object;
}) => {
  const {categoryType} = route?.params;

  // API initialization
  const [artistAddServices, {isLoading}] = useArtistAddServicesMutation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState([]);
  const [serviceImages, setServiceImages] = useState([]);
  const [paymentType, setPaymentType] = useState('Cash');
  const [durations, setDurations] = useState('');
  const AddServiceApi = () => {
    const formData = new FormData();
    formData.append('service', categoryType);
    formData.append('rates', rate);
    formData.append('duration', durations);
    formData.append('title', title);
    formData.append('images', serviceImages);
    formData.append('payment', paymentType);
    formData.append('description', description);

    artistAddServices(formData)
      ?.unwrap()
      .then(response => {
        navigation.navigate(strings?.myservices);
        AppToast({type: 'success', message: response?.status});
      })
      .catch(error => {
        console.log(error, 'ERROR F');
        AppToast({type: 'error', message: error});
      });
  };

  const uploadImages = (index: Number) => {
    ImagePicker.openPicker({
      cropping: true,
      width: 300,
      height: 400,
      compressImageQuality: 0.4 || null,
      mediaType: 'photo',
      minFiles: 1,
      smartAlbums: [
        'UserLibrary',
        'Favorites',
        'Screenshots',
        'RecentlyAdded',
        'Regular',
        'Generic',
        'Importeds',
        'SelfPortraits',
        'PhotoStream',
        'SyncedAlbum',
      ],
    }).then(image => {
      let obj = {
        uri: image?.path,
        type: image?.mime,
        name: image?.filename,
        index: index,
      };
      setServiceImages(prev => {
        const isIndexExist = prev.findIndex(item => item?.index === index);
        return isIndexExist !== -1
          ? prev.map((item, i) => (i === isIndexExist ? obj : item))
          : [...prev, obj];
      });
    });
  };

  // UI for ServiceImages
  const renderImagesUI = useCallback(() => {
    return Array.from({length: 4}, (_, index) => {
      const imagesObj = serviceImages?.find(item => item?.index === index);
      return (
        <DottedBorder
          width={screenWidth / 5.3}
          height={screenHeight / 11}
          imageSource={imagesObj ? imagesObj?.uri : null}
          onHandlePress={() => uploadImages(index)}
        />
      );
    });
  }, [serviceImages]);
  // MAIN RETURN
  return (
    <View style={styles.container}>
      <Header heading={strings?.enteryourlocation} />
      <ScrollView
        style={styles.scroolViewPadding}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <CustomText
          text={strings?.add_Service_Photos}
          size={14}
          style={{width: '100%', textAlign: 'left'}}
        />
        <CustomText
          text={strings?.lorem_ipsum}
          size={14}
          color={Colors.lightGrey}
          style={{width: '100%', textAlign: 'left'}}
        />
        <View style={styles.dottedBorderContainer}>{renderImagesUI()}</View>
        <CustomInput
          width={screenWidth / 1.1}
          paddingBottom={45}
          style={{marginTop: 30}}
          heigth={screenHeight / 10}
          placeholder={strings.add_Service_Description}
          placeHolderTextColor={Colors.black}
          label={strings.service_Description}
          onChangeText={text => setDescription(text)}
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
          onChangeText={text => setTitle(text)}
        />
        <CustomInput
          style={styles.inputMargin}
          width={screenWidth / 1.1}
          placeholder={strings.SR_24}
          label={strings.rates}
          placeHolderTextColor={Colors.black}
          onChangeText={text => setRate(text)}
        />
        <CustomInput
          style={styles.inputMargin}
          width={screenWidth / 1.1}
          placeholder={strings.zero_One}
          label={strings.duration_Time}
          placeHolderTextColor={Colors.black}
          onChangeText={text => setDurations(text)}
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
          style={styles.text}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            text={strings.Cash}
            style={{
              width: '30%',
              paddingTop: 0,
            }}
          />
          <CustomButton
            text={strings.credit_Card}
            textColor={Colors.lightGrey}
            bgColor={Colors.lightWhite}
            style={{
              width: '30%',
              paddingTop: 0,
            }}
          />
        </View>
        <View style={{marginBottom: 10, width: '100%'}}>
          <CustomButton
            style={styles.button}
            text={strings.next}
            isLoader={isLoading}
            onPress={() => AddServiceApi()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // backgroundColor: Colors.green,
  },
  dottedBorderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  text: {
    marginVertical: '3%',
    width: '100%',
    textAlign: 'left',
  },

  contentContainerStyle: {
    paddingHorizontal: 15,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  addMoreText: {
    textAlign: 'center',
  },
  button: {width: '100%', marginVertical: 10},
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  // cashButton: {margin: 5},
  inputMargin: {marginVertical: 0},
});
