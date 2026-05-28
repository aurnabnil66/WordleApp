import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStackNavigator from './AuthStackNavigator';
import UserStackNavigator from './UserStackNavigator';
import UserBottomTabNavigator from './UserBottomTabNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const Navigator: FC = () => {
  const loginStatus = useSelector((state: RootState) => state.user?.isLoggedIn);

  console.log('loginStatus : ', loginStatus);

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {loginStatus ? (
            <Stack.Screen name="UserTab" component={UserBottomTabNavigator} />
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Navigator;
