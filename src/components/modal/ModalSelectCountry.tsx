import React from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {TextView} from '../label';
import {Modal} from './Modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Font} from '~assets/fonts';
import Icon from 'react-native-vector-icons/Feather';
import { ICountry, listCountry } from '~config';

export interface ModalSelectCountryProps {
  containerStyle?: StyleProp<ViewStyle>;
  onSelectItem?: (item: ICountry) => void;
  isOpen: boolean;
}


export const ModalSelectCountry: React.FC<ModalSelectCountryProps> = props => {
  const {containerStyle, isOpen, onSelectItem} = props;

  return (
    <Modal
      isOpen={isOpen}
      position="center"
      style={[_styles.container, containerStyle]}
      coverScreen={false}>
      <View style={_styles.content}>
        <Text style={_styles.tx_title}>Chọn quốc gia/ khu vực</Text>
        <View style={_styles.view_search}>
          <Icon name="search" size={wp(6)} color={'gray'} />
          <TextInput
            placeholder="Tìm kiếm"
            style={{
              width: '80%',
              paddingHorizontal: wp(3),
              color: 'gray',
              fontSize: wp(4),
            }}
          />
        </View>

        <FlatList
          data={listCountry}
          keyExtractor={({id}) => id.toString()}
          style={{
            borderRadius: wp(3),
            marginTop: hp(2),
            width: '90%',
            alignSelf: 'center',
            marginBottom: hp(2),
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => onSelectItem && onSelectItem(item)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  width: '100%',
                  // height: hp(5),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  paddingVertical: hp(2),
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'gray',
                }}>
                <Image
                  source={{uri: item.uri}}
                  style={{width: wp(6), height: wp(4), marginLeft: wp(3)}}
                  resizeMode="stretch"
                />
                <Text style={_styles.tx_flatList}>{item.ten}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
};

const _styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    height: 1,
    marginTop: 8,
    width: '100%',
    backgroundColor: '#F1F3F8',
  },
  content: {
    backgroundColor: 'white',
    width: wp(90),
    height: hp(85),
    paddingTop: hp(2),
    // paddingLeft: wp(3),
  },
  input: {
    flex: 1,
  },
  padding: {width: 16},
  tx_title: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: wp(3),
  },
  tx_title1: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: '700',
    marginTop: hp(10),
    // marginLeft: wp(5),
  },
  tx_flatList: {
    color: 'black',
    fontSize: wp(3.5),
    fontWeight: '300',
    marginLeft: wp(5),
  },
  view_search: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(0.5),
    borderRadius: wp(3),
    marginTop: hp(2),
    flexDirection: 'row',
    width: '99%',
    alignSelf: 'center',
    borderBottomWidth: 1,
  },
});
