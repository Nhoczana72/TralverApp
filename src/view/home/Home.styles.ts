import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '~assets/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BGR,
    // paddingVertical: hp(5),
    // paddingLeft: wp(5),
  },
  view_search: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    borderRadius: wp(3),
    marginVertical: hp(2),
    flexDirection: 'row',
    width: '90%',
  },
  tx_title: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: '700',
  },
  tx_title1: {
    color: 'white',
    fontSize: wp(3.3),
  },
  tx_title2: {
    color: 'white',
    fontSize: wp(4),
    fontWeight: '700',
  },
});
