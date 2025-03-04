import React, {useEffect, useState} from 'react';
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

export interface IReelsCard {
  ViewableItem: any;
  onViewableItemsChanged: any;
  item: IVideo;
}
type IVideo = {id: number; ten: string; uri: string; scale: number};

export const ReelsCard: React.FC<IReelsCard> = props => {
  const {ViewableItem, onViewableItemsChanged, item} = props;
  const {listFavor} = useSelector(TokenSelector);
  const dispatch = useDispatch();
  const [staListFavorite, setStaListFavorite] = useState<IPlace[]>();
  // States
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const [Paused, SetPaused] = useState<boolean>(false);

  const [VideoDimensions, SetVideoDimensions] = useState({
    width: ScreenWidth,
    height: ScreenWidth,
  });
  useEffect(() => {
    if (ViewableItem === item.id) {
      SetPaused(false);
    } else {
      SetPaused(true);
    }
  }, [ViewableItem]);
  const [Duration, SetDuration] = useState(0);

  const onLoadComplete = event => {
    const {naturalSize} = event;

    try {
      const naturalWidth = naturalSize.width;
      const naturalHeight = naturalSize.height;
      if (naturalWidth > naturalHeight) {
        SetVideoDimensions({
          width: ScreenWidth,
          height: ScreenWidth * (naturalHeight / naturalWidth),
        });
      } else {
        SetVideoDimensions({
          width: ScreenHeight * (naturalWidth / naturalHeight),
          height: ScreenHeight,
        });
      }
      SetDuration(event.duration * 1000);
    } catch (error) {}
  };

  const {translate} = useAltaIntl();
  return (
    <View style={styles.container}>
      <View>
        <Video
          // Can be a URL or a local file.
          source={{uri: item.uri}}
          // play={true}
          paused={Paused}
          resizeMode="contain"
          onLoad={onLoadComplete}
          playInBackground={false}
          progressUpdateInterval={1000}
          // Store reference
          // ref={videoRef}
          // // Callback when remote video is buffering
          // onBuffer={onBuffer}
          // // Callback when video cannot be loaded
          // onError={onError}
          onLoad={data => {
            console.log(data);
          }}
          style={VideoDimensions}
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
