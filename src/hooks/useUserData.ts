import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useState, useEffect} from 'react';

export const useUserData = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  function onAuthStatusChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStatusChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return {user};
};
