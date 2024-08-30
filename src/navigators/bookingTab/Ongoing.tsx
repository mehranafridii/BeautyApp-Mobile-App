import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ProfileDetailBox from '../../components/ProfileDetailbox/ProfileDetailBox';
import {Colors} from '../../utils/colors/colors';
import {Images} from '../../assets/images';
import strings from '../../utils/strings/strings';
import {useNavigation} from '@react-navigation/native';

const Ongoing = ({data}: any) => {
  if (!data) return null;
  const navigation: any = useNavigation();
  const [toggleState, setToggleState] = useState(true);

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
        // onPress={handlePress}
      />
    );
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FlatList data={data} renderItem={renderItem} />
    </ScrollView>
  );
};

export default Ongoing;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});
