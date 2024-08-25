import {
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
import {useNavigation} from '@react-navigation/native';
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
import {useLazyGetArtistsProfileQuery} from '../../../Redux/services/app/AppApi';
import Utility from '../../../utils/utility/Utility';

const ArtistDetails = () => {
  //API initialization
  const [getArtistProfile, {data: artistProfileData}] =
    useLazyGetArtistsProfileQuery();
  const bottomSheetRef = useRef<RBSheet>(null);
  const photoSheetRef = useRef<RBSheet>(null);
  const descriptionSheetRef = useRef<RBSheet>(null);
  const addressSheetRef = useRef<RBSheet>(null);
  const navigation: any = useNavigation();
  const [index, setIndex] = useState(0);
  const [serviceForSheet, setServiceForSheet] = useState([]);
  useEffect(() => {
    GetArtistProfile();
  }, []);
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
      console.log(currentItem, 'skjfksdfj');
      const category = currentItem?.category_detail?.category;
      console.log(category, 'skdfjkdsjfkdsfj');
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(currentItem);
      return acc;
    },
    {},
  );
  console.log(serviceWithCategory, 'dsfdsfk23423ddd');
  const FirstRoute = () => (
    <ScrollView
      style={styles.flexContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.flexContainer}>
        <View style={styles.alserviceContainer}>
          <CustomText size={20} text={strings?.alservice} />
          <TouchableOpacity
            onPress={() => bottomSheetRef.current?.open()}
            activeOpacity={strings.buttonopacity}>
            <CustomText size={14} text={strings?.addservices} />
          </TouchableOpacity>
        </View>
        <View style={styles.centerView}>
          {/* <CustomeType
            textName={strings.hair_Cut}
            onPress={() => bottomSheetRef.current?.open()}
            text={strings?.type20}
          />
          <CustomeType
            textName={strings.hair_Coloring}
            text={strings?.type12}
          /> */}
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
          {/* <CustomeType textName={strings.hair_Wash} text={strings?.type08} />
          <CustomeType textName={strings.shaving} text={strings?.type12} />
          <CustomeType textName={strings.skincare} text={strings?.type04} />
          <CustomeType textName={strings.hairdry} text={strings?.type05} />
          <CustomeType textName={strings.face_makeup} text={strings?.type12} /> */}
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
          style={styles.flex}>
          <CustomText size={14} text={strings.addphotos} />
          <Image source={Images.gallery} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={artistProfileData?.gallary}
        numColumns={2}
        scrollEnabled={false}
        renderItem={({item, index}) => {
          const picture = Utility.getImageUrl(item?.image);
          console.log(picture, 'sjkfksdjf');
          return (
            <ImageBackground
              key={index}
              style={styles.bgImage}
              // source={picture ? {uri: picture} : item.img}
              source={Images.img1}>
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
      {/* <IconWithText path={Images.facbook} text={strings.artistUser} />
      <IconWithText path={Images.insta} text={strings.artistUser} />
      <IconWithText path={Images.dribbble} text={strings.artistUser} />
      <IconWithText path={Images.LinkedIn} text={strings.artistUser} />
      <IconWithText path={Images.twitterS} text={strings.artistUser} /> */}
      <TextImageText
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
        onPress={() => addressSheetRef?.current?.open()}
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
      <RBSheet
        ref={descriptionSheetRef}
        height={screenHeight / 2.7}
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
          <CustomText text={strings.description} />
          <TextInput
            numberOfLines={6}
            style={styles.descInput}
            placeholder={strings.enterdesc}
          />
          <FooterTwoButton
            marginTop={15}
            textLeft={strings.cancle}
            textRight={strings.adddesc}
          />
        </View>
      </RBSheet>
      <RBSheet
        ref={addressSheetRef}
        height={screenHeight / 1.47}
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
        </View>
      </RBSheet>
    </ScrollView>
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: fourthRoute,
  });
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={{color: Colors.black}}
      indicatorStyle={styles.indicatorStyle}
      style={{backgroundColor: Colors.white}}
    />
  );
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
            <Image style={styles.editImage} source={Images.edit} />
            <Image style={styles.profilePicStyle} source={Images.profilepic} />
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
            {weekdays?.map((item, index) => {
              return (
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
              );
            })}
            <FooterTwoButton
              marginTop={15}
              textLeft={strings.cancle}
              textRight={strings.addhours}
            />
          </View>
        </RBSheet>
        <RBSheet
          ref={photoSheetRef}
          height={screenHeight / 1.95}
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
            <CustomText size={18} text={strings?.uploadworkphotos} />
            <CustomText
              size={15}
              color={Colors.lightGrey}
              text={strings?.lorem_ipsum}
            />
            <DottedBorder
              width={screenWidth / 1.15}
              height={screenHeight / 7}
              text={strings?.uploadphotoshere}
              textColor={Colors.lightGrey}
              bgColor={Colors.grey10}
              marginBottom={20}
            />
            <CustomInput
              label={strings.photocategory}
              placeholder={strings.hairname}
              placeHolderTextColor={Colors.black}
            />
            <FooterTwoButton
              marginTop={15}
              textLeft={strings.cancle}
              textRight={strings.addtype}
            />
          </View>
        </RBSheet>
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
    borderColor: Colors.grey100,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    textAlignVertical: 'top',
  },
});
