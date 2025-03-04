import lodash from 'lodash';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removeAccents, useAltaIntl} from '~core';
import {TokenSelector} from '~modules/authentication';
import {listAddress, listCategory} from './datajson';
export const HomeLogic = () => {
  const dispatch = useDispatch();
  const {listFavor} = useSelector(TokenSelector);
  const [search, setSearch] = useState<string>('');
  const [staListPlace, setStaListPlace] = useState(listAddress);
  const [staCategory, setStaCategory] = useState(0);
  const [staScreen, setStaScreen] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const FlatListRef = useRef();
  const {translate} = useAltaIntl();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % listAddress.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (FlatListRef?.current) {
      FlatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  const [staListFavorite, setStaListFavorite] = useState([]);
  const onChangeSearch = lodash.debounce((tx: string) => {
    setSearch(tx);
    console.log(tx);
  }, 500);
  useEffect(() => {
    let _listPlace = [...listAddress];

    if (staCategory === 0) {
      // setStaListPlace(listAddress);
    } else {
      _listPlace = listAddress.filter(
        (item1, index) =>
          item1?.loai_dia_diem === listCategory[staCategory].ten,
      );
      // setStaListPlace(_listPlace);
    }
    if (search !== '') {
      const _search = removeAccents(search);
      const _data = _listPlace.filter(dd =>
        removeAccents(dd.ten.toLowerCase()).includes(_search.toLowerCase()),
      );

      setStaListPlace(_data);
    } else {
      setStaListPlace(_listPlace);
    }
  }, [search, staCategory]);
  return {
    dispatch,
    listFavor,
    onChangeSearch,
    staListPlace,
    setStaListPlace,
    staScreen,
    FlatListRef,
    setStaCategory,
    staCategory,
    translate,
    setStaScreen,
  };
};
