import {ColorPropType, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '~assets/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(6),
    paddingHorizontal: wp(5),
    backgroundColor: Colors.BGR,
  },
  tx_title: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: '700',
    marginVertical: hp(1),
  },
  tx_title1: {
    color: 'white',
    fontSize: wp(3.3),
    lineHeight: wp(5),
  },
  tx_title2: {
    color: 'white',
    fontSize: wp(4),
    fontWeight: '700',
  },
  img: {
    width: wp(90),
    height: wp(50),
    marginVertical: hp(1),
    borderRadius: wp(3),
  },
  view_map: {
    height: wp(45),
    width: wp(90),
    backgroundColor: '#EDEDEE',
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
