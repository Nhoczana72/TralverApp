import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TokenSelector} from '~modules/authentication';

export interface IPlace {
  id: string;
  ten: string;
  vi_tri: string;
  hinh_anh: string;
  mo_ta: string;
  thong_tin_chi_tiet: string;
  loai_dia_diem: string;
  trip_photos: string[];
  longitude: number;
  latitude: number;
  rating: number;
}
export const PlaceDetailLogic = () => {
  const dispatch = useDispatch();
  const {params} = useRoute();
  const isFocus = useIsFocused();
  const {listFavor} = useSelector(TokenSelector);
  const [staDataPlace, setStaDataPlace] = useState<IPlace | undefined>(
    undefined,
  );
  useEffect(() => {
    if (isFocus) {
      setStaDataPlace(params?.data);
    }
  }, [isFocus]);
  return {dispatch, staDataPlace, listFavor};
};
