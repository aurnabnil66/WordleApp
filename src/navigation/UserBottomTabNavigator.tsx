import React, {type FC} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SavedWords from '../screens/SavedWords/SavedWords';
import UserProfile from '../screens/UserProfile/UserProfile';
import {colors} from '../theme/colors';
import styles from './style';

const Tab = createBottomTabNavigator();

const MaterialCommunityIcon = MaterialCommunityIcons as any;

const EntypoIcon = Entypo as any;

const UserBottomTabNavigator: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          if (route.name === 'Home') {
            return (
              <MaterialCommunityIcon name="bookmark" size={22} color={color} />
            );
          } else if (route.name === 'User') {
            return (
              <MaterialCommunityIcon name="account" size={22} color={color} />
            );
          } else if (route.name === 'Saved') {
            return <EntypoIcon name="archive" size={22} color={color} />;
          } else {
            return (
              <MaterialCommunityIcon
                name="questioncircleo"
                size={28}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: colors.componentBackground,
        tabBarInactiveTintColor: colors.dropdownPlaceholder,
        tabBarLabelStyle: {fontSize: 12},
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Saved"
        component={SavedWords}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="User"
        component={UserProfile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default UserBottomTabNavigator;
