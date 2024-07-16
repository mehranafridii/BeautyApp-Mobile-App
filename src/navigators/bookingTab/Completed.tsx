import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors/colors';
import ProfileDetailBox from '../../components/ProfileDetailbox/ProfileDetailBox';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';

const Completed = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileDetailBox
        dateText={strings.aug_25}
        image={Images.addImage}
        hideToggle={true}
      />
    </ScrollView>
  );
};

export default Completed;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});
