import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Upcoming from '../../../navigators/bookingTab/Upcoming';
import Ongoing from '../../../navigators/bookingTab/Ongoing';
import Completed from '../../../navigators/bookingTab/Completed';
import Cancle from '../../../navigators/bookingTab/Cancle';

const Bookings = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: strings.upcoming},
    {key: 'second', title: strings.completed},
    {key: 'third', title: strings.onGoing},
    {key: 'fourth', title: strings.cancle},
  ]);
  const renderScene = SceneMap({
    first: Upcoming,
    second: Ongoing,
    third: Completed,
    fourth: Cancle,
  });
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={{color: Colors.black}}
      indicatorStyle={{backgroundColor: Colors.primary}}
      style={{backgroundColor: Colors.white}}
    />
  );
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
