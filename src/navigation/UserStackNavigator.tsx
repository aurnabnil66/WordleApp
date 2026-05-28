import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {colors} from '../theme/colors';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const UserStack = createNativeStackNavigator();

const UserStackNavigator: FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.componentBackground}
      />
      <UserStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Remove default header
        }}>
        <UserStack.Screen name="Home" component={HomeScreen} />
      </UserStack.Navigator>
    </SafeAreaProvider>
  );
};

export default UserStackNavigator;
