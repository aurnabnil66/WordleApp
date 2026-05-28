import {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface IGoogleSignInButtonProps {
  user: FirebaseAuthTypes.User | null | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<FirebaseAuthTypes.User | null | undefined>
  >;
}

export default IGoogleSignInButtonProps;
