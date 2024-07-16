import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/home/homeScreen/Home';
import Earnings from '../../screens/earnings/earningScreen/Earnings';
import MyService from '../../screens/myServices/myServiceScreen/MyService';
import Bookings from '../../screens/bookings/bookingsScreen/Bookings';
import Profile from '../../screens/profile/profileScreen/Profile';
import {Images} from '../../assets/images';
import {Colors} from '../../utils/colors/colors';
import ProfileNavigator from '../profileNavigator/ProfileNavigator';

const BottomStack = () => {
  const Bottom = createBottomTabNavigator();
  return (
    <Bottom.Navigator
      initialRouteName="بيت"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 8,
          height: 55,
        },
      }}>
      <Bottom.Screen
        name="بيت"
        component={Home}
        options={{
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused && (
                  <Image
                    style={{top: -7, marginLeft: 4}}
                    source={Images.polygon}
                  />
                )}
                <Image
                  source={Images.home2}
                  style={{
                    height: 27,
                    width: 27,
                    tintColor: focused ? Colors.primary : Colors.lightGrey,
                  }}
                />
              </View>
            );
          },
        }}
      />

      <Bottom.Screen
        name="الأرباح"
        component={Earnings}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused && (
                  <Image
                    style={{top: -7, marginLeft: 4}}
                    source={Images.polygon}
                  />
                )}

                <Image
                  source={Images.earning2}
                  style={{
                    height: 27,
                    width: 27,
                    tintColor: focused ? Colors.primary : Colors.lightGrey,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Bottom.Screen
        name="خدماتي"
        component={MyService}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused && (
                  <Image
                    style={{top: -7, marginLeft: 4}}
                    source={Images.polygon}
                  />
                )}
                <Image
                  source={Images.service2}
                  style={{
                    height: 27,
                    width: 27,
                    resizeMode: 'contain',
                    tintColor: focused ? Colors.primary : Colors.lightGrey,
                  }}
                />
              </View>
            );
          },
        }}
      />

      <Bottom.Screen
        name="الحجوزات"
        component={Bookings}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused && (
                  <Image
                    style={{top: -7, marginLeft: 4}}
                    source={Images.polygon}
                  />
                )}
                <Image
                  source={Images.calender2}
                  style={{
                    height: 27,
                    width: 27,
                    tintColor: focused ? Colors.primary : Colors.lightGrey,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Bottom.Screen
        name="حساب تعريفي"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused && (
                  <Image
                    style={{top: -7, marginLeft: 4}}
                    source={Images.polygon}
                  />
                )}
                <Image
                  source={Images.profile2}
                  style={{
                    height: 27,
                    width: 27,
                    tintColor: focused ? Colors.primary : Colors.lightGrey,
                  }}
                />
              </View>
            );
          },
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomStack;

const styles = StyleSheet.create({});
