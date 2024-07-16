import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import UserStack from '../UserStack/UserStack';
import AppStack from '../appStack/AppStack';

const Routes = () => {
  const MainStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={'AppStack'}
        screenOptions={{headerShown: false}}>
        <MainStack.Screen name="AppStack" component={AppStack} />
        <MainStack.Screen name="UserStack" component={UserStack} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
