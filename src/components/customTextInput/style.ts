import {StyleSheet} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    height: scale(50),
    width: scale(320),
  },
  errorText: {
    color: colors.error,
    fontSize: moderateScale(12),
    fontWeight: '600',
    marginTop: scale(2),
  },
});

export default styles;
