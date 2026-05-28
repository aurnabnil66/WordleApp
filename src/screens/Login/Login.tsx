import React, {FC} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import GoogleSignInButton from '../../components/GoogleSignInButton/GoogleSignInButton';
import CustomButton from '../../components/customButton/CustomButton';
import CustomTextInput from '../../components/customTextInput/CustomTextInput';
import {Formik} from 'formik';
import {logInFormValidationSchema} from '../../schemas/login.schema';
import styles from './style';
import {Row, Grid} from 'react-native-easy-grid';
import Animated, {
  SlideInDown,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loginRequest} from '../../store/slices/userSlice';
import ToastPopUp from '../../utils/ToastAndroid';

const Login: FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [disable, setDisable] = useState(false);

  const dispatch = useDispatch();

  // keyboard movement animation
  const keyboard = useAnimatedKeyboard();
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: -keyboard.height.value * 0.5}],
  }));

  function onAuthStatusChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStatusChanged);

    // Reset the keyboard animation height when returning to this screen
    keyboard.height.value = 0;

    return subscriber; // unsubscribe on unmount
  }, []);

  GoogleSignin.configure({
    webClientId:
      '688321464537-jpruj18euksimlimnu0jrpp8j9g820lt.apps.googleusercontent.com',
    // Web Client ID from google-services.json
    offlineAccess: true,
  });

  const handleLogin = (values: any) => {
    //console.log(values);
    setDisable(true);

    dispatch(loginRequest(values));

    ToastPopUp('Login Successful');
  };

  const handleGoToSignUp = () => {
    navigation.navigate('CreateAccount' as never);
  };

  return (
    <Grid style={styles.mainGridStyle}>
      {/* Header */}
      <Row style={styles.firstRowContainer}>
        <Image
          style={styles.headerImage}
          source={require('../../assets/wordle_logo.png')}
        />
      </Row>

      {/* Login Form */}
      <Row>
        <Animated.View
          entering={SlideInDown}
          style={[styles.secondRowContainer, animatedStyles]}>
          <View style={styles.secondRowHeaderPosition}>
            <Text style={styles.secondRowHeaderText1}>
              {' '}
              Welcome to W O R D L E
            </Text>
            <Text style={styles.secondRowHeaderText2}>
              Enter your credentials
            </Text>
          </View>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={handleLogin}
            validationSchema={logInFormValidationSchema}>
            {({handleChange, handleSubmit, values, errors, touched}) => (
              <>
                <View style={{marginTop: 27}}>
                  <CustomTextInput
                    label="Email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    isError={touched.email && !!errors.email}
                    errorText={touched.email ? errors.email : undefined}
                  />
                </View>
                <View style={{marginTop: 27}}>
                  <CustomTextInput
                    label="Password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    showIcon
                    secureTextEntry
                    isError={touched.password && !!errors.password}
                    errorText={touched.password ? errors.password : undefined}
                  />
                </View>
                <View style={{marginTop: 38}}>
                  <CustomButton
                    text="Login"
                    onPress={handleSubmit}
                    disabled={false}></CustomButton>
                </View>
              </>
            )}
          </Formik>
          <View style={{marginTop: 10}}>
            <Text style={styles.orText}>Or</Text>
          </View>

          <View style={{marginTop: 10}}>
            <GoogleSignInButton />
          </View>

          {/* Ask To Register */}
          <View style={styles.registerUserTextView}>
            <Text style={styles.doNotHaveAccountText}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleGoToSignUp} disabled={disable}>
              <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Row>
    </Grid>
  );
};

export default Login;
