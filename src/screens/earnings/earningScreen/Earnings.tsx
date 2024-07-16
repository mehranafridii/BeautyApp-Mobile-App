import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Header from '../../../components/header/Header';
import {Colors} from '../../../utils/colors/colors';
import strings from '../../../utils/strings/strings';
import CustomText from '../../../components/text/CustomText';
import NamePriceComponent from '../NamePriceComponent';
import {useNavigation} from '@react-navigation/native';
import WaletBox from '../WaletBox';

const FirstRoute = () => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColor}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColor}
    />
    <NamePriceComponent
      priceText={'- ' + strings.saudiaPrice}
      textColor={Colors.textColorRed}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColor}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColorRed}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColor}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColorRed}
    />
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColor}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColor}
    />
    <NamePriceComponent
      priceText={'- ' + strings.saudiaPrice}
      textColor={Colors.textColorRed}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColor}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColorRed}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColor}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColorRed}
    />
  </ScrollView>
);
const ThirdRoute = () => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColor}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColor}
    />
    <NamePriceComponent
      priceText={'- ' + strings.saudiaPrice}
      textColor={Colors.textColorRed}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColor}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColorRed}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColor}
    />
    <NamePriceComponent
      priceText={'+ ' + strings.price}
      textColor={Colors.textColorRed}
    />
  </ScrollView>
);

const Earnings = () => {
  const navigation: any = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: strings.earning},
    {key: 'second', title: strings.pendigEarnings},
    {key: 'third', title: strings.widthraw},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
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
      <Header heading={strings?.earning} />
      <WaletBox />
      <TouchableOpacity
        style={{marginHorizontal: 15}}
        onPress={() => navigation.navigate(strings.myServices)}>
        <CustomText
          style={{textAlign: 'left', marginTop: 10}}
          color={Colors.walletText}
          size={14}
          text={strings.paymentHistory}
        />
      </TouchableOpacity>
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

export default Earnings;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  tabView: {
    marginHorizontal: 15,
  },
  scene: {
    flex: 1,
  },
});
