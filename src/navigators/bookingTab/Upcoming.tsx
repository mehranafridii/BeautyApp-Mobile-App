import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ProfileDetailBox from '../../components/ProfileDetailbox/ProfileDetailBox';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';
import {Colors} from '../../utils/colors/colors';
import {useNavigation} from '@react-navigation/native';

const Upcoming = () => {
  const [toggleState, setToggleState] = useState(true);

  const navigation: any = useNavigation();
  const handleToggle = (isOn: boolean) => {
    setToggleState(isOn);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileDetailBox
        dateText={strings.aug_25}
        image={Images.addImage}
        isOn={toggleState}
        onToggle={handleToggle}
      />
      <ProfileDetailBox
        dateText={strings.aug_28}
        image={Images.detail_Image}
        isOn={toggleState}
        onToggle={handleToggle}
        onPress={() => navigation.navigate(strings.booking_Detail)}
      />
    </ScrollView>
  );
};

export default Upcoming;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});
