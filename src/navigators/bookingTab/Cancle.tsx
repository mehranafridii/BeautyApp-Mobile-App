import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProfileDetailBox from '../../components/ProfileDetailbox/ProfileDetailBox';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';
import {Colors} from '../../utils/colors/colors';

const Cancle = ({data}: any) => {
  if (!data) return null;
  const renderItem = ({item, index}) => {
    return (
      <ProfileDetailBox
        itemData={item}
        dateText={strings.aug_25}
        image={Images.addImage}
      />
    );
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FlatList data={data} renderItem={renderItem} />
    </ScrollView>
  );
};

export default Cancle;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});
