import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {moderateScale, scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainGridStyle: {
    backgroundColor: colors.componentBackground,
  },
  headerImage: {
    width: scale(88),
    height: scale(88),
  },
  firstRowContainer: {
    height: scale(60),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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
  registerUserTextView: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
  alreadyHaveAccountText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: colors.secondary,
  },
  signInText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: colors.componentBackground,
    textDecorationLine: 'underline',
  },
  orText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: colors.componentBackground,
  },
});

export default styles;
