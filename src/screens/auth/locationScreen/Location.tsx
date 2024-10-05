import {
  Alert,
  AppState,
  BackHandler,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Images} from '../../../assets/images';
import {Colors} from '../../../utils/colors/colors';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import CustomButton from '../../../components/button/CustomButton';
import CustomInput from '../../../components/input/CustomInput';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserType} from '../../../Redux/Reducers/UserTypeSlice';
import Geolocation from 'react-native-geolocation-service';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import AppToast from '../../../components/appToast/AppToast';
import {staticLocations, staticlocations} from '../../../config/LocationsData';
import DropDownPicker from 'react-native-dropdown-picker';
import {useAddLocationMutation} from '../../../Redux/services/auth/AuthApi';
import {setDataInLocalStorage} from '../../../utils/mmkv/MMKV';
import {setUser} from '../../../Redux/Reducers/UserSlice';
import {MMKV_KEYS} from '../../../constants/MMKV_KEY';
import {changeStack} from '../../../navigators/NavigationService';

const Location = ({navigation}) => {
  const dispatch = useDispatch();

  //API initialization
  const [addLocationAPI, {isLoading}] = useAddLocationMutation();

  const checkType = useSelector(getUserType);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(staticlocations);
  const [selectedLocation, setSelectedLocation] = useState();
  const [sheetData, setSheetData] = useState([]);
  const bottomSheetRef = useRef<RBSheet>(null);

  const openBottomSheet = (data: any) => {
    setSheetData([]);
    bottomSheetRef?.current?.open();
  };
  const [hasLocationPermission, setHasLocationPermission] =
    useState<boolean>(false);

  const isFocused = useIsFocused();
  // Ref
  const appState = useRef(AppState.currentState);

  //States
  const [locationCoords, setLocationCoords] = useState();
  console.log(isFocused, 'jfdksjfdksj222');
  // useEffects
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    // checking App state to get latest location
    // also when user has to give permissions then it should get the latest lat and long
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      appState.current === 'active' && getLocation();
    });

    return () => {
      subscription.remove();
    };
  }, []);
  console.log(locationCoords, 'sdkjfkdsjfLLLKDJFKDJF');
  // Get the location
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocationCoords(position.coords);
        // let payloadData = {
        //   lat: position.coords?.latitude,
        //   long: position.coords?.longitude,
        // };
      },
      error => {
        const errorMessage = error?.message;
        error.code === 1
          ? (AppToast({type: 'error', message: errorMessage}),
            handlePermissionError())
          : null;
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const handleAddLocation = (city, lat, long) => {
    if (selectedLocation || locationCoords) {
      const formData = new FormData();
      formData.append('city', city);
      formData.append('locationlat', lat);
      formData.append('locationlong', long);
      console.log(formData, 'dsfjkdsfjJJJJ');

      addLocationAPI(formData)
        ?.unwrap()
        ?.then(response => {
          console.log(response, 'kjdfkjdsfjdskfj');
          dispatch(setUser(response?.user));
          setDataInLocalStorage(MMKV_KEYS.USER_DATA, response?.user);
          checkType == 'user'
            ? changeStack('AppStack')
            : navigation.navigate(strings.uploaddocsscreen);
        })
        .catch(error => {
          console.log(error, 'sdjfdksjLLLLL');
        });
    } else {
      AppToast({
        type: 'error',
        message: 'Select Location',
      });
    }
  };
  //Handle permissions
  const handlePermissionError = () => {
    Alert.alert(
      'Location Permission Denied',
      'We need access to your location to provide better service. Please enable location services in your settings.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open Settings', onPress: () => openSettings()},
      ],
      {cancelable: false},
    );
  };

  console.log(locationCoords, 'locationCoordslocationCoords');
  //Main Return
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <Image
        style={{marginTop: screenHeight * 0.09}}
        source={Images.currentloc}
      />

      <CustomText
        size={24}
        fontWeight="bold"
        style={{marginTop: 25}}
        text={strings.whatloction}
      />
      <CustomText
        color={Colors.lightGrey}
        style={{marginVertical: 15}}
        text={strings.needlocation}
      />
      {/* <CustomInput
        value={value}
        setValue={setValue}
        open={open}
        setOpen={setOpen}
        items={items}
        setItems={setItems}
        dropdownPlaceholder={strings.allcities}
        label={strings.selectcity}
        errorIndicator={false}
      /> */}
      <CustomText
        text={strings.selectcity}
        style={{textAlign: 'left', width: '82%'}}
      />
      <Pressable
        onPress={() => {
          bottomSheetRef?.current?.open();
        }}
        style={styles.inputButtonCity}>
        <CustomText text={selectedLocation?.name_ar || strings.allcities} />
        <Image source={Images.arrow_Down_Bold} />
      </Pressable>
      <Pressable
        style={styles.currentLocation}
        onPress={() =>
          handleAddLocation(
            '',
            locationCoords?.latitude,
            locationCoords?.longitude,
          )
        }>
        <Image style={{marginRight: 10}} source={Images.locationmark} />
        <CustomText size={16} text={strings.usecurrenloc} />
      </Pressable>
      <CustomButton
        onPress={() => {
          handleAddLocation(
            selectedLocation?.name_ar,
            selectedLocation?.center[0],
            selectedLocation?.center[1],
          );
        }}
        isLoader={isLoading}
        style={{marginTop: 20}}
        text={strings.addLocation}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate(strings.manuallocationscreen)}
        activeOpacity={strings.buttonopacity}>
        <CustomText
          size={18}
          color={Colors.primary}
          style={{marginTop: 15}}
          text={strings.enterlocman}
        />
      </TouchableOpacity>
      <RBSheet
        ref={bottomSheetRef}
        height={screenHeight / 1.2}
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
            text={strings.allcities}
            size={18}
            style={{alignSelf: 'center'}}
          />
          <ScrollView contentContainerStyle={styles.sheetScrollContainer}>
            <CustomText
              color={Colors.lightGrey}
              text={strings.searchresult}
              style={{textAlign: 'left'}}
            />
            {staticLocations?.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLocation(item);
                    bottomSheetRef?.current?.close();
                  }}>
                  <View
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      borderBottomColor: Colors.grey100,
                      borderBottomWidth: 0.5,
                      width: '90%',
                      alignSelf: 'center',
                      // paddingHorizontal: 10,
                    }}>
                    <View style={styles.locContainer}>
                      <Image
                        style={{marginRight: 5, width: 17, height: 17}}
                        source={Images.locationmark}
                      />
                      <CustomText
                        size={16}
                        text={item?.name_ar}
                        style={{textAlign: 'left'}}
                      />
                    </View>

                    <CustomText
                      color={Colors.lightGrey}
                      text={item?.name_ar}
                      style={{textAlign: 'left'}}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </RBSheet>
    </ScrollView>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  sheetScrollContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 34,
  },
  inputButtonCity: {
    borderColor: Colors.grey100,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
    width: screenWidth / 1.2,
  },
  locContainer: {
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    width: '82%',
  },
});
