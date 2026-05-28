import {StyleSheet} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';

const styles = StyleSheet.create({
  buttonStyle: {
    height: scale(50),
    width: scale(320),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.componentBackground,
  },
  buttonText: {
    color: colors.appBackground,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
});

export default styles;
