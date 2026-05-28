import React, {useState} from 'react';
import {TouchableOpacity, Text, Alert, Image} from 'react-native';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import styles from './style';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../store/slices/userSlice';
import ToastPopUp from '../../utils/ToastAndroid';

const GoogleSignInButton: React.FC = () => {
  const [localUser, setLocalUser] = useState<null | FirebaseAuthTypes.User>(
    null,
  );
  const dispatch = useDispatch();

  const onGoogleButtonPress = async () => {
    if (localUser) return;

    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const {type, data} = await GoogleSignin.signIn();

      if (type === 'success') {
        const googleCredential = auth.GoogleAuthProvider.credential(
          data.idToken,
        );
        const userCredential = await auth().signInWithCredential(
          googleCredential,
        );

        const user = userCredential.user;
        setLocalUser(user); // store only for internal rendering
        dispatch(loginSuccess(user));
        ToastPopUp('Login Successful');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            Alert.alert('Login cancelled');
            break;
          case statusCodes.IN_PROGRESS:
            Alert.alert('Login in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert('Play services not available');
            break;
          default:
            Alert.alert('Unknown error');
        }
      } else {
        Alert.alert('Unexpected error occurred');
        console.error(error);
      }
    }
  };

  const buttonTitle = localUser?.displayName
    ? `Signed in as: ${localUser.displayName}`
    : 'Continue with Google';

  return (
    <TouchableOpacity style={styles.signInButton} onPress={onGoogleButtonPress}>
      <Image
        style={styles.googleLogoStyle}
        source={require('../../assets/google_logo.png')}
      />
      <Text style={styles.signInButtonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default GoogleSignInButton;
