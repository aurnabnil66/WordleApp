import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import CreateAccount from '../screens/CreateAccount/CreateAccount';
import {FC} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {colors} from '../theme/colors';

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator: FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.componentBackground}
      />
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Remove default header
        }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
      </AuthStack.Navigator>
    </SafeAreaProvider>
  );
};

export default AuthStackNavigator;
