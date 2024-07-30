import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProfileDetailBox from '../../components/ProfileDetailbox/ProfileDetailBox';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';
import {Colors} from '../../utils/colors/colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  useLazyArtistUpcomingBookingsQuery,
  useLazyCustomerUpcomingBookingsQuery,
} from '../../Redux/services/app/AppApi';
import {useSelector} from 'react-redux';
import {getUserType} from '../../Redux/Reducers/UserTypeSlice';

const Upcoming = ({data}: any) => {
  console.log(data, 'sdfdsf3333333');

  if (!data) return null;
  //API initialization
  // const [customerUpcomingApi] = useLazyCustomerUpcomingBookingsQuery();
  // const [artistUpcomingApi] = useLazyArtistUpcomingBookingsQuery();
  //Const
  const navigation: any = useNavigation();
  const userType = useSelector(getUserType);
  const [toggleState, setToggleState] = useState(true);

  //Functions
  const handleToggle = (isOn: boolean) => {
    setToggleState(isOn);
  };
  const renderItem = ({item, index}) => {
    return (
      <ProfileDetailBox
        itemData={item}
        dateText={strings.aug_25}
        image={Images.addImage}
        isOn={toggleState}
        onToggle={handleToggle}
      />
    );
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FlatList data={data} renderItem={renderItem} />
    </ScrollView>
  );
};

export default Upcoming;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});
