import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import CustomText from '../../../components/text/CustomText';
import CircleImage from '../../../components/CircleImage/CircleImage';
import CustomButton from '../../../components/button/CustomButton';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import {Images} from '../../../assets/images';

const AddServicesSelected = () => {
  const categoriesData = [
    {categoryTitle: strings.haircut, image: Images.hairCuts},
    {categoryTitle: strings.makeup, image: Images.makeUp},
    {categoryTitle: strings.shaving, image: Images.shavingBeard},
    {categoryTitle: strings.hairdry, image: Images.hairDry},
    {categoryTitle: strings.massage, image: Images.massage},
    {categoryTitle: strings.henna, image: Images.henna},
    {categoryTitle: strings.nailcare, image: Images.nailCare},
    {categoryTitle: strings.feetcare, image: Images.feetCare},
    {categoryTitle: strings.skincare, image: Images.skinCare},
  ];
  return (
    <View style={styles.container}>
      <Header heading={strings?.addService} />
      <View style={styles.innerContainer}>
        <CustomText
          text={strings.services}
          style={styles.serviceText}
          size={14}
        />
        <FlatList
          data={categoriesData}
          horizontal={false}
          numColumns={3}
          columnWrapperStyle={styles.columnStyle}
          renderItem={({item}) => (
            <CircleImage text={item?.categoryTitle} image={item?.image} />
          )}
        />
      </View>
    </View>
  );
};

export default AddServicesSelected;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  columnStyle: {justifyContent: 'space-between'},
  rowCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceText: {textAlign: 'left', paddingHorizontal: 5},
  innerContainer: {paddingHorizontal: 15},
});
