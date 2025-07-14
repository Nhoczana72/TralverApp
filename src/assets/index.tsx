import {fromPairs} from 'lodash';

const SOURCE = {
  LOGO: require('./logo.png'),
  LOGO1: require('./logo1.png'),
};

export const getSource = (source: keyof typeof SOURCE) => {
  return SOURCE[source];
};

export * from './svg';
export * from './icons';
