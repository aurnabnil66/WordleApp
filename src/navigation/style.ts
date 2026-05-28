import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';

const {width} = Dimensions.get('window'); // screen width

const styles = StyleSheet.create({
  tabBarStyle: {
    bottom: 15,
    position: 'absolute',
    marginLeft: (width - 320) / 2,
    borderRadius: 20,
    height: 60,
    width: 320,
    backgroundColor: colors.appBackground,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export default styles;
