import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Upcoming from '../../../navigators/bookingTab/Upcoming';
import Ongoing from '../../../navigators/bookingTab/Ongoing';
import Completed from '../../../navigators/bookingTab/Completed';
import Cancle from '../../../navigators/bookingTab/Cancle';
import {useSelector} from 'react-redux';
import {getUserType} from '../../../Redux/Reducers/UserTypeSlice';
import {
  useLazyArtistBookingsQuery,
  useLazyArtistCancelBookingsQuery,
  useLazyArtistCompleteBookingsQuery,
  useLazyArtistUpcomingBookingsQuery,
  useLazyCustomerBookingsQuery,
  useLazyCustomerCancelBookingsQuery,
  useLazyCustomerCompleteBookingsQuery,
  useLazyCustomerUpcomingBookingsQuery,
} from '../../../Redux/services/app/AppApi';

const Bookings = () => {
  //API initialization
  const [customerUpcomingApi, {data: customerUpcomingData}] =
    useLazyCustomerUpcomingBookingsQuery();
  const [customerCompletedApi, {data: customerCompletedData}] =
    useLazyCustomerCompleteBookingsQuery();
  const [customerCancelApi, {data: customerCancelData}] =
    useLazyCustomerCancelBookingsQuery();
  const [customerBookingApi, {data: customerBookingData}] =
    useLazyCustomerBookingsQuery();

  const [artistUpcomingApi, {data: artistUpcomingData}] =
    useLazyArtistUpcomingBookingsQuery();
  const [artistCompletedApi, {data: artistCompletedData}] =
    useLazyArtistCompleteBookingsQuery();
  const [artistCancelApi, {data: artistCancelData}] =
    useLazyArtistCancelBookingsQuery();
  const [artistBookingApi, {data: artistBookingData}] =
    useLazyArtistBookingsQuery();
  //Store
  const userType = useSelector(getUserType);
  //Consts
  const isBusiness = userType === 'business' ? true : false;
  // States
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: strings.upcoming},
    {key: 'second', title: strings.completed},
    {key: 'third', title: strings.onGoing},
    {key: 'fourth', title: strings.cancle},
  ]);
  // const [customerRoutes] = React.useState([
  //   {key: 'first', title: strings.upcoming},
  //   {key: 'second', title: strings.completed},
  //   {key: 'third', title: strings.cancle},
  // ]);

  /// APIs
  useEffect(() => {
    // Check Type and HIT APIs
    if (isBusiness) {
      index === 0
        ? GetArtistUpcomingBookingAPI()
        : index === 1
        ? GetArtistCompletedBookingAPI()
        : index === 2
        ? GetArtistBookingAPI()
        : GetArtistCancelBookingAPI();
    } else {
      index === 0
        ? GetCustomerUpcomingBookingAPI()
        : index === 1
        ? GetCustomerCompeletedBookingAPI()
        : GetCustomerCancelBookingAPI();
    }
  }, [index]);

  //Getting All Data but revert for now
  const fetchArtistBookingData = async () => {
    try {
      const [
        upcomingResponse,
        completedResponse,
        cancelResponse,
        bookingResponse,
      ] = await Promise.all([
        customerUpcomingApi('').unwrap(),
        customerCompletedApi('').unwrap(),
        customerCancelApi('').unwrap(),
        customerBookingApi('')?.unwrap(),
      ]);
    } catch (error) {}
  };
  ///

  /// API functions
  //API Functions

  // Artist-Business APIs below
  const GetArtistUpcomingBookingAPI = () => {
    artistUpcomingApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'RESDFD');
      })
      .catch(error => {
        console.log(error, 'sdjfkdsjfk');
      });
  };
  const GetArtistCompletedBookingAPI = () => {
    artistCompletedApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'RESDFD');
      })
      .catch(error => {
        console.log(error, 'sdjfkdsjfk');
      });
  };
  const GetArtistBookingAPI = () => {
    artistBookingApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'RESDFD');
      })
      .catch(error => {
        console.log(error, 'sdjfkdsjfk');
      });
  };
  const GetArtistCancelBookingAPI = () => {
    artistCancelApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'RESDFD');
      })
      .catch(error => {
        console.log(error, 'sdjfkdsjfk');
      });
  };
  ///////////////////////////////////////////
  // Customers APIs below
  const GetCustomerUpcomingBookingAPI = () => {
    customerUpcomingApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'dfdsCUSOTME11');
      })
      .catch(error => {
        console.log(error, 'sdjfkdsjfk');
      });
  };
  const GetCustomerCompeletedBookingAPI = () => {
    customerCompletedApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'RESDFD');
      })
      .catch(error => {
        console.log(error, 'sdjfkdsjfk');
      });
  };
  const GetCustomerCancelBookingAPI = () => {
    customerCancelApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'RESDFD');
      })
      .catch(error => {
        console.log(error, 'sdjfkdsjfk');
      });
  };
  const GetCustomerBookingAPI = () => {
    customerBookingApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'RESDFD');
      })
      .catch(error => {
        console.log(error, 'sdjfkdsjfk');
      });
  };
  ///////////////////////////////////////////////
  // UI functions below
  const renderCustomerScene = SceneMap({
    first: () => <Upcoming data={customerUpcomingData?.data} />,
    second: () => <Ongoing data={customerUpcomingData?.data} />,
    third: () => <Completed data={customerCompletedData?.data} />,
    fourth: () => <Cancle data={customerCancelData?.data} />,
  });
  const renderArtistScene = SceneMap({
    first: () => <Upcoming data={artistUpcomingData?.data} />,
    second: () => <Ongoing data={artistBookingData?.data} />,
    third: () => <Completed data={artistCompletedData?.data} />,
    fourth: () => <Cancle data={artistCancelData?.data} />,
  });
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={{color: Colors.black}}
      indicatorStyle={{backgroundColor: Colors.primary}}
      style={{backgroundColor: Colors.white}}
    />
  );
  // User TYPE RENDERING CONDITIONS
  // const Routes = isBusiness ? artistRoutes : customerRoutes;
  const renderScene = isBusiness ? renderArtistScene : renderCustomerScene;

  // MAIN RETURN
  return (
    <View style={styles.container}>
      <Header heading={strings?.booking} searchCircle={true} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{width: Dimensions.get('window').width}}
        style={styles.tabView}
      />
    </View>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  tabView: {
    marginHorizontal: 15,
  },
  scene: {
    flex: 1,
  },
});
