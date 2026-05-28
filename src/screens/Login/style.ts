import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {scale, moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainGridStyle: {
    backgroundColor: colors.componentBackground,
  },
  firstRowContainer: {
    height: scale(130),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    width: scale(88),
    height: scale(88),
  },
  secondRowContainer: {
    flex: 1,
    backgroundColor: colors.appBackground,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  secondRowHeaderPosition: {
    marginTop: scale(20),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondRowHeaderText1: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: colors.componentBackground,
  },
  secondRowHeaderText2: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: colors.componentBackground,
  },
  orText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: colors.componentBackground,
  },
  registerUserTextView: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 20,
  },
  doNotHaveAccountText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: colors.secondary,
  },
  signUpText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: colors.componentBackground,
    textDecorationLine: 'underline',
  },
});

export default styles;
