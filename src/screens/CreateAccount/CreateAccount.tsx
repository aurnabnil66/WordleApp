import React, {FC, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import styles from './style';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';
import CustomButton from '../../components/customButton/CustomButton';
import CustomTextInput from '../../components/customTextInput/CustomTextInput';
import {Formik} from 'formik';
import {createAccountFormValidationSchema} from '../../schemas/createAccount.schema';
import {Row, Grid} from 'react-native-easy-grid';
import {useNavigation} from '@react-navigation/native';
import GoogleSignInButton from '../../components/GoogleSignInButton/GoogleSignInButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../theme/colors';
import {useDispatch} from 'react-redux';
import {registerRequest} from '../../store/slices/userSlice';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ToastPopUp from '../../utils/ToastAndroid';

const AntDesignIcon = AntDesign as any;

const CreateAccount: FC = () => {
  const [disable, setDisable] = useState(false);
  const navigation = useNavigation();

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const dispatch = useDispatch();

  // keyboard movement animation
  const keyboard = useAnimatedKeyboard();
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: -keyboard.height.value * 0.5}],
  }));

  const handleSignUp = (values: any) => {
    //console.log('Submitting form with values:', values);
    setDisable(true);

    dispatch(registerRequest(values));

    ToastPopUp('Account Created Successfully');

    setTimeout(() => {
      navigation.navigate('Login' as never);
    }, 1000);
  };

  const handleGoToLogin = () => {
    navigation.goBack();
  };

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

  return (
    <Grid style={styles.mainGridStyle}>
      {/* Header */}
      <Row style={styles.firstRowContainer}>
        <View
          style={{
            right: 100,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <TouchableOpacity onPress={handleGoToLogin}>
            <AntDesignIcon
              name="arrowleft"
              size={28}
              color={colors.buttonAndSelection}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              color: colors.appBackground,
              fontWeight: '700',
            }}>
            Back to Login
          </Text>
        </View>
      </Row>

      {/* Login Form */}
      <Row>
        <Animated.View style={[styles.secondRowContainer, animatedStyles]}>
          <View style={styles.secondRowHeaderPosition}>
            <Text style={styles.secondRowHeaderText1}>
              {' '}
              Welcome to W O R D L E
            </Text>
            <Text style={styles.secondRowHeaderText2}>
              Create an account to continue
            </Text>
          </View>

          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
            <Formik
              initialValues={{
                fullName: '',
                mobile: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={handleSignUp}
              validationSchema={createAccountFormValidationSchema}>
              {({handleChange, handleSubmit, values, errors, touched}) => (
                <>
                  <View style={{marginTop: 22}}>
                    <CustomTextInput
                      label="Full Name"
                      placeholder="Full Name"
                      value={values.fullName}
                      onChangeText={handleChange('fullName')}
                      isError={touched.fullName && !!errors.fullName}
                      errorText={touched.fullName ? errors.fullName : undefined}
                    />
                  </View>
                  <View style={{marginTop: 24}}>
                    <CustomTextInput
                      label="Email"
                      placeholder="Email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      isError={touched.email && !!errors.email}
                      errorText={touched.email ? errors.email : undefined}
                    />
                  </View>
                  {/* <View style={{marginTop: 24}}>
                    <CustomTextInput
                      label="Mobile Number"
                      placeholder="Mobile Number"
                      value={values.mobile}
                      onChangeText={handleChange('mobile')}
                      isError={touched.mobile && !!errors.mobile}
                      errorText={touched.mobile ? errors.mobile : undefined}
                    />
                  </View> */}
                  <View style={{marginTop: 24}}>
                    <CustomTextInput
                      label="Password"
                      placeholder="Password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      showIcon
                      secureTextEntry
                      isError={touched.password && !!errors.password}
                      errorText={touched.password ? errors.password : undefined}
                    />
                  </View>
                  <View style={{marginTop: 24}}>
                    <CustomTextInput
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      showIcon
                      secureTextEntry
                      isError={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                      errorText={
                        touched.confirmPassword
                          ? errors.confirmPassword
                          : undefined
                      }
                    />
                  </View>

                  <View style={{marginTop: 40}}>
                    <CustomButton
                      text="Sign Up"
                      onPress={handleSubmit}
                      disabled={disable}></CustomButton>
                  </View>
                </>
              )}
            </Formik>

            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <View style={{marginTop: 10}}>
                <Text style={styles.orText}>Or</Text>
              </View>

              <View style={{marginTop: 10}}>
                <GoogleSignInButton />
              </View>

              {/* Ask To Register */}
              <View style={styles.registerUserTextView}>
                <Text style={styles.alreadyHaveAccountText}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={handleGoToLogin}>
                  <Text style={styles.signInText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </Row>
    </Grid>
  );
};

export default CreateAccount;
