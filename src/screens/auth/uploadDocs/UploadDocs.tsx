import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import Header from '../../../components/header/Header';
import DottedBorder from '../../../components/dottedBorder/DottedBorder';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import {Images} from '../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../components/button/CustomButton';
import {RequestGalleryPermission} from '../../../utils/GalleryPermission/GalleryPermission';
import ImagePicker from 'react-native-image-crop-picker';
const UploadDocs = () => {
  const navigation: any = useNavigation();
  const [profileImage, setProfileImage] = useState('');
  const pickImage = async () => {
    console.log('first');
    const options: {
      cropping: boolean;
      cropperCircleOverlay: boolean;
      cropperToolbarTitle: string;
      mediaType: 'photo';
    } = {
      cropping: true,
      cropperCircleOverlay: false,
      cropperToolbarTitle: 'Crop Image',
      mediaType: 'photo',
    };

    const galleryPermissionStatus = await RequestGalleryPermission();
    {
      galleryPermissionStatus == 'granted'
        ? ImagePicker.openPicker(options)
            .then(res => {
              setProfileImage(res.path);
              console.log('response@@@@', res.path);
            })
            .catch(err => console.log('Error', err))
        : null;
    }
  };
  return (
    <View style={styles.container}>
      <CustomText
        style={styles.alignleft}
        size={14}
        text={strings.uploaddocs}
      />
      <View style={styles.borderPadding}>
        <CustomText
          style={styles.alignleft}
          size={14}
          text={strings.uploadworklicense}
        />
        <DottedBorder
          width={screenWidth / 1.1}
          height={screenHeight / 6}
          text={strings.uploadyourdocs}
          // onPress={() => pickImage()}
        />
        <CustomText
          style={styles.alignleft}
          size={14}
          text={strings.uploadIdcard}
        />
        <DottedBorder
          width={screenWidth / 1.1}
          height={screenHeight / 6}
          text={strings.uploadyourdocs}
          // onPress={pickImage}
        />
        <CustomText
          style={styles.alignleft}
          size={14}
          text={strings.uploadwork}
        />
        <CustomText
          style={styles.dummyText}
          color={Colors.lightGrey}
          size={14}
          text={strings.dumytext}
        />
        <View style={styles.uploadPhotosContainer}>
          <View>
            <DottedBorder
              width={screenWidth / 2.3}
              height={screenHeight / 8}
              text={strings.uploadphotos}
              // onPress={pickImage}
            />
          </View>
          <DottedBorder
            width={screenWidth / 2.3}
            height={screenHeight / 8}
            text={strings.uploadphotos}
            // onPress={pickImage}
          />
        </View>
        <CustomButton
          style={styles.button}
          text={strings.compsignup}
          onPress={() => navigation.navigate(strings?.bottomTab)}
        />
      </View>
    </View>
  );
};

export default UploadDocs;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white, padding: 15},
  borderContainer: {
    justifyContent: 'center',
    marginHorizontal: 5,
    height: 100,
    width: screenWidth / 2.45,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  button: {width: '100%'},
  uploadPhotosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderPadding: {
    paddingVertical: 20,
  },
  dummyText: {textAlign: 'left', marginTop: 10},
  alignleft: {textAlign: 'left'},
});
