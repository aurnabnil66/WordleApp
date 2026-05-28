import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {moderateScale, scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainGridStyle: {
    backgroundColor: colors.componentBackground,
  },
  firstRowContainer: {
    height: scale(130),
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondRowContainer: {
    backgroundColor: colors.appBackground,
    justifyContent: 'center',
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
  headerImage: {
    width: scale(50),
    height: scale(50),
  },
  scrollViewContainer: {
    padding: scale(18),
  },
});

export default styles;
