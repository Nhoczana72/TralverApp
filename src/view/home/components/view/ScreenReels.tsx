import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '~assets/color';
import {useAltaIntl} from '~core';
import {TokenSelector} from '~modules/authentication';
import {listAddress, listVideo} from '~view/home/datajson';
import {IPlace} from '~view/placeDetail/PlaceDetail.logic';
import IconHeart from 'react-native-vector-icons/FontAwesome';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {navigate} from '~core/helper/navigate';
import Video from 'react-native-video';
import {ReelsCard} from '../card/ReelsCard';

export interface IScreenReels {}

export const ScreenReels: React.FC<IScreenReels> = props => {
  const {} = props;
  const {listFavor} = useSelector(TokenSelector);
  const dispatch = useDispatch();
  const [staListFavorite, setStaListFavorite] = useState<IPlace[]>();

  const {translate} = useAltaIntl();
  const [ViewableItem, SetViewableItem] = useState('');
  const ScreenHeight = Dimensions.get('window').height;

  // Viewable configuration
  const onViewRef = useRef(viewableItems => {
    if (viewableItems?.viewableItems?.length > 0) {
      SetViewableItem(viewableItems.viewableItems[0].item._id || 0);
    }
  });
  return (
    <View style={styles.container}>
      <Text style={styles.tx_title}>Reels</Text>
      <View>
        <FlatList
          data={listVideo}
          renderItem={({item}) => {
            return <ReelsCard ViewableItem={ViewableItem} item={item} />;
          }}
          pagingEnabled
          decelerationRate={0.9}
          onViewableItemsChanged={onViewRef.current}
          getItemLayout={(_data, index) => ({
            length: ScreenHeight,
            offset: ScreenHeight * index,
            index,
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    width: wp(100),
    height: hp(100),
    paddingVertical: hp(5),
    paddingLeft: wp(5),
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
