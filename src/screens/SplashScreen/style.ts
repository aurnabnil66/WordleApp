import {StyleSheet} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';

import {colors} from '../../theme/colors';

const styles = StyleSheet.create({
  appTypeText: {
    color: 'white',
    fontSize: moderateScale(16),
    textAlign: 'center',
    fontWeight: '600',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.componentBackground,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    bottom: scale(20),
    position: 'absolute',
    textAlign: 'center',
  },
});

export default styles;
