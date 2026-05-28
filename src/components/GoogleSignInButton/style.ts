import {StyleSheet} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';

const styles = StyleSheet.create({
  signInButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: scale(10),
    borderWidth: 0.5,
    borderColor: colors.componentBackground,
    flexDirection: 'row',
    gap: scale(10),
    height: scale(50),
    width: scale(320),
    justifyContent: 'center',
  },
  googleLogoStyle: {
    width: scale(23),
    height: scale(23),
  },
  signInButtonText: {
    color: 'black',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
});

export default styles;
