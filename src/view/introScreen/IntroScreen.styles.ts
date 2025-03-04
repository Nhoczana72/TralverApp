import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  tx1: {
    color: 'white',
    fontSize: wp(4.5),
    textAlign: 'center',
    fontWeight: '700',
    width: '72%',
    alignSelf: 'center',
    marginTop: hp(2),
  },
});
