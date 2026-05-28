import {StyleSheet} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';

const styles = StyleSheet.create({
  dropdown: {
    height: scale(50),
    width: scale(320),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: scale(16),
  },
  placeholderStyle: {
    fontSize: moderateScale(16),
    color: colors.dropdownPlaceholder,
  },
  errorTextStyle: {
    color: colors.error,
    fontSize: moderateScale(12),
    fontWeight: '600',
    marginTop: scale(2),
  },
});

export default styles;
