import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomeType from '../../../components/CustomType/CustomeType';
import RBSheet from 'react-native-raw-bottom-sheet';
import {photosData, profileData, weekdays} from '../../../utils/dummyData';
import FooterTwoButton from '../../../components/footerTwoButton/FooterTwoButton';
import DottedBorder from '../../../components/dottedBorder/DottedBorder';
import CustomInput from '../../../components/input/CustomInput';
import ProfileCard from '../../../components/profileCard/ProfileCard';
import ProfileButtons from '../../../components/ProfileButtons/ProfileButtons';
import IconWithText from '../../../components/IconWithText/IconWithText';
import TextImageText from '../../../components/textImageText/TextImageText';
import TextWithImage from '../../../components/textWithImage/TextWithImage';
import {
  useAddArtistWorkingHoursMutation,
  useAddGalleryMutation,
  useLazyGetArtistsProfileQuery,
  useUpdateArtistAboutUsMutation,
  useUpdateArtistImageMutation,
} from '../../../Redux/services/app/AppApi';
import Utility from '../../../utils/utility/Utility';
import AppToast from '../../../components/appToast/AppToast';
import ImagePicker from 'react-native-image-crop-picker';

const ArtistDetails = () => {
  //API initialization
  const [getArtistProfile, {data: artistProfileData}] =
    useLazyGetArtistsProfileQuery();
  const [updateAboutUs] = useUpdateArtistAboutUsMutation();
  const [updateArtistImage] = useUpdateArtistImageMutation();
  const [addWorkingHours] = useAddArtistWorkingHoursMutation();
  const [addGallery] = useAddGalleryMutation();
  const bottomSheetRef = useRef<RBSheet>(null);
  const photoSheetRef = useRef<RBSheet>(null);
  const descriptionSheetRef = useRef<RBSheet>(null);
  const addressSheetRef = useRef<RBSheet>(null);
  const navigation: any = useNavigation();
  const [index, setIndex] = useState(0);
  const [serviceForSheet, setServiceForSheet] = useState([]);
  const [profileImage, setProfileImage] = useState();
  const [galleryImages, setGalleryImages] = useState();
  const [galleryCategoryName, setGalleryCategoryName] = useState();
  const [aboutUs, setAboutUs] = useState();
  const isFocused = useIsFocused();
  console.log(descriptionSheetRef, 'descriptionSheetRefdescriptionSheetRef');
  useEffect(() => {
    GetArtistProfile();
  }, [isFocused]);

  console.log(artistProfileData, 'artistProfileData?.servicesdfdsdf');
  const GetArtistProfile = () => {
    getArtistProfile('')
      .unwrap()
      ?.then(response => {
        const {data} = response;
      })
      .catch(error => {
        console.log(error);
      });
  };
  const UpdateAboutUs = (aboutUsText: string) => {
    const formData = new FormData();
    formData.append('description', aboutUsText);
    updateAboutUs(formData)
      ?.unwrap()
      ?.then(response => {
        const {status} = response;
        console.log(response, 'responseresponsedfd');
        descriptionSheetRef?.current?.close();
        AppToast({type: 'success', message: status});
        setAboutUs('');
      });
  };
  const AddGalleryAPI = () => {
    if (galleryImages?.uri && galleryCategoryName) {
      const formData = new FormData();
      formData.append('category', galleryCategoryName);
      formData.append('image', galleryImages);
      addGallery(formData)
        .unwrap()
        ?.then(res => {
          console.log(res);
        })
        .catch(error => {});
    } else {
      AppToast({type: 'error', message: 'Please add details'});
    }
  };
  const AddArtistWorkingHours = () => {
    const formData = new FormData();
    formData.append('date', galleryCategoryName);
    formData.append('starttime', galleryImages);
    formData.append('endtime', galleryImages);
    formData.append('availability', galleryImages);
    formData.append('starttime', galleryImages);
    formData.append('otherurl', galleryImages);
    addWorkingHours(formData);
  };
  // Upload Image for profile
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
        'SelfPortraits',
        'PhotoStream',
        'SyncedAlbum',
        'Imported',
      ],
    }).then(image => {
      let obj = {
        uri: image?.path,
        type: image?.mime,
        name: image?.filename,
        index: index,
      };
      setGalleryImages(obj);
      // setProfileImage(obj);
    });
  };
  //Image of Artist
  const artistImage = artistProfileData?.profile?.image
    ? Utility.getImageUrl(artistProfileData?.profile?.image)
    : null;

  const [routes] = useState([
    {key: 'first', title: strings.services},
    {key: 'second', title: strings.gallery},
    {key: 'third', title: strings.review1},
    {key: 'fourth', title: strings.aboutus},
  ]);
  const serviceWithCategory = artistProfileData?.services?.reduce(
    (acc, currentItem) => {
      const category = currentItem?.category_detail?.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(currentItem);
      return acc;
    },
    {},
  );
  ///////////////////////////// Tabs Routes and UI /////////////////////////////
  const FirstRoute = () => (
    <ScrollView
      style={styles.flexContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.flexContainer}>
        <View style={styles.alserviceContainer}>
          <CustomText
            size={20}
            text={`${strings?.allservice} (${artistProfileData?.services?.length})`}
          />
          <TouchableOpacity
            // onPress={() => bottomSheetRef.current?.open()}
            onPress={() => navigation.navigate('AddServicesSelected')}
            activeOpacity={strings.buttonopacity}>
            <CustomText size={14} text={strings?.addservices} />
          </TouchableOpacity>
        </View>
        <View style={styles.centerView}>
          <FlatList
            data={artistProfileData?.services}
            renderItem={({item, index}) => (
              <CustomeType
                textName={item?.category_detail?.category}
                onPress={() => {
                  // bottomSheetRef?.current?.open(),
                  setServiceForSheet(serviceWithCategory[item?.service]);
                }}
                text={strings?.type20}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
  const SecondRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.photoContainer}>
        <CustomText size={20} text={strings.photos} />
        <TouchableOpacity
          onPress={() => photoSheetRef.current?.open()}
          activeOpacity={strings.buttonopacity}
          style={[styles.flex, {gap: 5}]}>
          <Image source={Images.gallery} />
          <CustomText size={14} text={strings.addphotos} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={artistProfileData?.gallary}
        numColumns={2}
        scrollEnabled={false}
        renderItem={({item, index}) => {
          console.log(item?.image, 'IMAJAJA');
          const picture = Utility.getImageUrl(item?.image);
          console.log(picture, 'ksjfkdsjiJIII');
          return (
            <ImageBackground
              key={index}
              style={styles.bgImage}
              borderRadius={12}
              source={picture ? {uri: picture} : Images.img1}
              defaultSource={Images.img1}>
              {item?.category && (
                <View style={styles.categoryContainer}>
                  <CustomText
                    color={Colors.white}
                    text={item?.category}
                    style={{textAlign: 'left'}}
                  />
                </View>
              )}
            </ImageBackground>
          );
        }}
      />
    </ScrollView>
  );
  const ThirdRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingHorizontal: 15, paddingTop: 10}}>
        <CustomText size={22} text={strings.reviews} />
        <View style={styles.input}>
          <View style={styles.flex}>
            <Image source={Images.search} />
            <TextInput
              style={styles.textInput}
              placeholder={strings.searchreviews}
              placeholderTextColor={Colors.lightGrey}
            />
          </View>
        </View>
      </View>
      <ProfileButtons />
      <View style={styles.profileCardContainer}>
        <FlatList
          data={profileData}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            return (
              <ProfileCard
                name={item?.name}
                image={item?.img}
                duration={item?.duration}
                desc={item?.desc}
                followers={item?.followers}
                rating={item?.rating}
                imagesArray={item?.imagesArray}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
  const fourthRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.buttonContainer}>
        <CustomText size={20} text={strings.aboutus} />
        <TouchableOpacity
          onPress={() => descriptionSheetRef?.current?.open()}
          activeOpacity={strings.buttonopacity}
          style={styles.flex}>
          <CustomText
            color={Colors.primary}
            size={14}
            text={strings.edit_About}
          />
          <Image source={Images.edited} style={{marginLeft: 5}} />
        </TouchableOpacity>
      </View>
      <CustomText
        text={artistProfileData?.aboutus?.description}
        color={Colors.lightGrey}
        style={{marginHorizontal: 10, textAlign: 'left'}}
      />
      <TextImageText
        onPress={() => bottomSheetRef?.current?.open()}
        withImage={strings.modify_Working_Hour}
        withoutImageText={strings.workinghours}
      />
      <View style={styles.divider2} />
      {artistProfileData?.workinghours?.map((item, index) => {
        return (
          <View key={index} style={styles.sheetContainer4}>
            <CustomText
              color={Colors.lightGrey}
              size={16}
              text={`${item?.starttime}-${item?.endtime}`}
            />
            <View style={styles.flex}>
              <CustomText size={14} fontWeight="400" text={item?.time} />
            </View>
          </View>
        );
      })}
      <TextImageText
        withoutImageText={strings.social_Media}
        withImage={strings.social_Media_Editing}
      />
      <View style={styles.divider2} />
      <IconWithText
        path={Images.facbook}
        text={artistProfileData?.sociallinks[0]?.facebook}
      />
      <IconWithText
        path={Images.insta}
        text={artistProfileData?.sociallinks[0]?.instagram}
      />
      <IconWithText
        path={Images.dribbble}
        text={artistProfileData?.sociallinks[0]?.otherurl}
      />
      <IconWithText
        path={Images.LinkedIn}
        text={artistProfileData?.sociallinks[0]?.linkedin}
      />
      <IconWithText
        path={Images.twitterS}
        text={artistProfileData?.sociallinks[0]?.twiter}
      />
      <TextImageText
        onPress={() => addressSheetRef?.current?.open()}
        withoutImageText={strings.contactUs}
        withImage={strings.editing_Contact_Detail}
      />
      <View style={styles.divider2} />
      <View style={styles.textImageContainer}>
        <TextWithImage
          path={Images.call}
          text={strings.callNumber}
          textColor={Colors.black}
          size={14}
          alignSelf={'flex-start'}
        />
      </View>
      <View style={styles.textImageContainer}>
        <TextWithImage
          path={Images.sms}
          text={strings.exampleEmail}
          textColor={Colors.black}
          size={14}
          alignSelf={'flex-start'}
        />
      </View>
      <TextImageText
        onPress={() => Alert.alert('MapScreen')}
        withImage={strings.viewOnMap}
        withoutImageText={strings.address}
      />

      <View style={styles.divider2} />
      <View style={styles.textImageContainer2}>
        <TextWithImage
          path={Images.location_Mark}
          text={strings.prestonRd}
          textColor={Colors.black}
          size={14}
          alignSelf={'flex-end'}
        />
      </View>
      <Image source={Images.locationImage} style={styles.imageStyle} />
    </ScrollView>
  );
  /////////////////////////// Tabs UI End /////////////////////////////////////////
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: fourthRoute,
  });
  /// Tab RENDER UI
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={{color: Colors.black}}
      indicatorStyle={styles.indicatorStyle}
      style={{backgroundColor: Colors.white}}
    />
  );

  ////////// Main Return /////////////////
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgImageStyle} source={Images.profilebg}>
        <TouchableOpacity
          style={styles.backImage}
          activeOpacity={strings.buttonopacity}
          onPress={() => navigation.goBack()}>
          <Image source={Images.back} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={strings.buttonopacity}
          style={styles.editContainer}>
          <CustomText size={14} color={Colors.lightGrey} text={strings.edit} />
          <Image style={{marginLeft: 4}} source={Images.camera} />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.topContainer}>
        <View style={styles.iconMainContainer}>
          <View style={styles.artistContainer}>
            <CustomText
              color={Colors.lightGrey}
              size={14}
              text={'@artistuser'}
            />
            <Image style={styles.instaImage} source={Images.insta} />
          </View>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              style={styles.editImage}
              onPress={() => navigation.navigate('YourProfile')}>
              <Image source={Images.edit} />
            </TouchableOpacity>
            <Image
              style={styles.profilePicStyle}
              source={{uri: artistImage}}
              defaultSource={Images.profilepic}
            />
          </View>
          <View style={styles.artistContainer}>
            <CustomText
              color={Colors.lightGrey}
              size={14}
              text={'@artistuser'}
            />
            <Image style={styles.instaImage} source={Images.facbook} />
          </View>
        </View>
        <View style={styles.jennyContainer}>
          <CustomText size={24} text={artistProfileData?.profile?.name} />
          <View style={styles.artistContainer}>
            <CustomText
              color={Colors.lightGrey}
              size={16}
              text={strings.jobdone}
            />
            <Text style={styles.jobCancleLine}> | </Text>
            <CustomText
              color={Colors.lightGrey}
              size={16}
              text={strings.jobcancel}
            />
          </View>
          <View style={styles.artistContainer}>
            <Image style={styles.clockImage} source={Images.clock} />
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={strings.min15}
            />
            <View style={styles.dot} />
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={strings.km15}
            />
            <View style={styles.dot} />
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={strings.pm11}
            />
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={strings.am11}
            />
            <Text style={styles.monsunText}> | </Text>
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={strings.monsun}
            />
          </View>
          <View style={styles.runningContainer}>
            <Image style={styles.runningImage} source={Images.running} />
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={`${strings.travelingCost} ${artistProfileData?.profile?.travelingcost}`}
            />
          </View>
          <View style={styles.reviewContainer}>
            <CustomText fontWeight="600" size={15} text={strings.review} />
            <Image style={styles.startImage} source={Images.star} />

            <CustomText fontWeight="600" size={15} text={strings.favorite} />
            <Image style={styles.heartImg} source={Images.heart} />
          </View>
        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{width: screenWidth}}
          style={styles.tabViewStyle}
        />
        <RBSheet
          ref={bottomSheetRef}
          height={screenHeight / 1.35}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            draggableIcon: {
              backgroundColor: Colors.grey100,
              width: 123,
            },
          }}>
          <View style={styles.contentContainer}>
            <CustomText
              style={styles.alignText}
              size={22}
              text={strings?.workinghours}
            />
            <View style={styles.divider} />
            {weekdays?.map((item, index) => (
              <View key={index} style={styles.sheetContainer}>
                <CustomText
                  color={Colors.lightGrey}
                  size={16}
                  text={item?.weekday}
                />
                <View style={styles.flex}>
                  <CustomText size={14} fontWeight="400" text={item?.time} />

                  <Image style={{marginLeft: 5}} source={Images.arrow_down} />
                </View>
              </View>
            ))}
            {/* <FlatList
              data={artistProfileData?.workinghours}
              renderItem={({item, index}) => {
                console.log(item, 'skdfkdsfjkiTT');
                return (
                  <View key={index} style={styles.sheetContainer}>
                    <CustomText
                      color={Colors.lightGrey}
                      size={16}
                      text={item?.date}
                    />
                    <View style={styles.flex}>
                      <CustomText
                        size={14}
                        fontWeight="400"
                        text={`${item?.endtime}-${item?.starttime} `}
                      />

                      <Image
                        style={{marginLeft: 5}}
                        source={Images.arrow_down}
                      />
                    </View>
                  </View>
                );
              }}
            /> */}
            <FooterTwoButton
              marginTop={15}
              textLeft={strings.cancle}
              textRight={strings.addhours}
            />
          </View>
        </RBSheet>
        <RBSheet
          ref={photoSheetRef}
          height={screenHeight / 1.5}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            draggableIcon: {
              backgroundColor: Colors.grey100,
              width: 123,
            },
          }}>
          <View style={styles.contentContainer}>
            <CustomText
              style={styles.alignText}
              size={22}
              text={strings?.addphotos}
            />
            <View style={styles.divider} />
            <CustomText
              size={18}
              text={strings?.uploadworkphotos}
              style={{textAlign: 'left'}}
            />
            <CustomText
              size={15}
              color={Colors.lightGrey}
              text={strings?.lorem_ipsum}
              style={{textAlign: 'left'}}
            />
            <DottedBorder
              width={screenWidth / 1.15}
              height={screenHeight / 7}
              imageSource={galleryImages?.uri}
              text={strings?.uploadphotoshere}
              textColor={Colors.lightGrey}
              bgColor={Colors.grey10}
              marginBottom={20}
              onHandlePress={() => uploadImages()}
            />
            <CustomInput
              label={strings.photocategory}
              placeholder={strings.hairname}
              value={galleryCategoryName}
              placeHolderTextColor={Colors.black}
              onChangeText={text => setGalleryCategoryName(text)}
            />
            <FooterTwoButton
              marginTop={15}
              textLeft={strings.cancle}
              textRight={strings.addtype}
              onPressLeft={() => photoSheetRef?.current?.close()}
              onPressRight={() => {
                AddGalleryAPI();
              }}
            />
          </View>
        </RBSheet>
        {/* To Change About Us BottomSheet */}
        <RBSheet
          ref={descriptionSheetRef}
          height={screenHeight / 2.2}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            draggableIcon: {
              backgroundColor: Colors.grey100,
              width: 123,
            },
          }}>
          <View style={styles.contentContainer}>
            <CustomText
              style={styles.alignText}
              size={22}
              text={strings?.adddesc}
            />
            <View style={[styles.divider, {marginBottom: 17}]} />
            <CustomText
              text={strings.description}
              style={{textAlign: 'left'}}
            />
            <TextInput
              // numberOfLines={6}
              style={styles.descInput}
              placeholder={strings.enterdesc}
              value={aboutUs}
              onChangeText={text => setAboutUs(text)}
            />
            <FooterTwoButton
              marginTop={15}
              textLeft={strings.cancle}
              textRight={strings.adddesc}
              onPressLeft={() => descriptionSheetRef?.current?.close()}
              onPressRight={() => UpdateAboutUs(aboutUs)}
            />
          </View>
        </RBSheet>
        {/* End */}
        {/* To Change Address Us BottomSheet  */}
        <RBSheet
          ref={addressSheetRef}
          height={screenHeight / 1.3}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            draggableIcon: {
              backgroundColor: Colors.grey100,
              width: 123,
            },
          }}>
          <ScrollView
            contentContainerStyle={[
              styles.contentContainer,
              {paddingBottom: 50},
            ]}>
            <CustomText
              style={styles.alignText}
              size={22}
              text={strings?.contactndadress}
            />
            <View style={[styles.divider, {marginBottom: 17}]} />
            <CustomInput label={strings.phonenum} placeholder={strings.num} />
            <CustomInput
              style={{marginTop: 10}}
              label={strings.email}
              placeholder={strings.expemail}
            />
            <CustomInput
              style={{marginTop: 10}}
              label={strings.address}
              placeholder={strings.prestonRd}
            />
            <Image source={Images.locationImage} style={styles.imageStyle} />
            <FooterTwoButton
              marginTop={15}
              textLeft={strings.cancle}
              textRight={strings.contactndadress}
            />
          </ScrollView>
        </RBSheet>
        {/* End */}
      </View>
    </View>
  );
};

export default ArtistDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  dot: {
    backgroundColor: Colors.lightGrey,
    height: 5,
    width: 5,
    borderRadius: 99,
    marginHorizontal: 5,
  },
  contentContainer: {
    paddingHorizontal: 30,
  },
  divider: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1,
    marginTop: 11,
    marginBottom: 7,
  },
  divider2: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1,
    width: screenWidth / 1.1,
    marginHorizontal: 5,
    marginTop: 11,
    marginBottom: 7,
  },
  bgImageStyle: {
    height: screenHeight / 3.8,
    width: screenWidth,
    alignSelf: 'center',
  },
  alignText: {textAlign: 'center'},
  tabViewStyle: {marginHorizontal: 8},
  heartImg: {height: 20, width: 20, marginRight: 3},
  startImage: {height: 20, width: 20, marginLeft: 3},
  reviewContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  runningContainer: {flexDirection: 'row', alignItems: 'center'},
  runningImage: {height: 20, width: 20, marginRight: 3},
  profilePicStyle: {
    width: 112,
    height: 112,
    borderRadius: 100,
  },
  monsunText: {fontSize: 20, color: Colors.lightGrey},
  jobCancleLine: {fontSize: 24, color: Colors.lightGrey},
  jennyContainer: {marginTop: '8%', alignItems: 'center'},
  clockImage: {height: 20, width: 20, marginRight: 3},
  instaImage: {marginLeft: 5, height: 30, width: 30},
  artistContainer: {flexDirection: 'row', alignItems: 'center'},
  iconMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  topContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    zIndex: 1,
    marginTop: -35,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  editImage: {zIndex: 3, position: 'absolute', bottom: 5, left: 9},
  editView: {
    borderWidth: 7,
    borderColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 99,
    zIndex: 2,
    marginTop: '13%',
    backgroundColor: 'pink',
  },
  avatarContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    left: '38%',
    bottom: 0,
    borderRadius: 100,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 30,
    bottom: 55,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  backImage: {marginTop: 25, marginRight: 25, alignSelf: 'flex-end'},
  indicatorStyle: {
    backgroundColor: Colors.primary,
    height: 4,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  alserviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  centerView: {alignItems: 'center'},
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  categoryContainer: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 8,
    right: 11,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  bgImage: {height: 180, width: 180, margin: 4},
  profileCardContainer: {marginVertical: 10},
  flexContainer: {flex: 1},
  sheetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.grey100,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  sheetContainer4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.grey100,
    padding: 5,
    marginHorizontal: 7,
    marginVertical: 2,
  },
  input: {
    borderColor: Colors.grey100,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginTop: 8,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  textInput: {
    marginLeft: 11,
    width: screenWidth / 1.5,
    color: Colors.lightGrey,
  },
  textImageContainer: {paddingHorizontal: 20, paddingBottom: 5},
  textImageContainer2: {paddingHorizontal: 20},
  viewOnMap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  imageStyle: {
    width: screenWidth / 1.15,
    backgroundColor: 'red',
    height: screenHeight / 6,
    marginVertical: 10,
    alignSelf: 'center',
  },
  descInput: {
    height: 141,
    borderColor: Colors.grey100,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    textAlign: 'right',
    paddingHorizontal: 10,
  },
});
