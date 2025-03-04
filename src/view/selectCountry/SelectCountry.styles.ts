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
  },
  tx_title1: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: '700',
    marginTop: hp(10),
    marginLeft: wp(5),
  },
  tx_flatList: {
    color: 'white',
    fontSize: wp(3.5),
    fontWeight: '300',
    marginLeft: wp(5),
  },
  view_search: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    borderRadius: wp(3),
    marginTop: hp(2),
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
});
