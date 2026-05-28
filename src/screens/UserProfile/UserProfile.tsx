import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FC, useEffect, useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/slices/userSlice';
import ToastPopUp from '../../utils/ToastAndroid';
import {userLogout} from '../../api/FirebaseAuthUtils';

const UserProfile: FC = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  function onAuthStatusChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStatusChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const renderLogoutView = () => {
    if (user) {
      return (
        <Pressable
          onPress={() => {
            userLogout()
              .then(message => {
                ToastPopUp(message);
                dispatch(logout());
              })
              .catch(error => {
                ToastPopUp(error.title);
              });
          }}>
          <Text style={{fontWeight: 'bold', color: 'red', fontSize: 18}}>
            Logout
          </Text>
          <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 18}}>
            {user.email}
          </Text>
        </Pressable>
      );
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{renderLogoutView()}</Text>
    </View>
  );
};

export default UserProfile;
