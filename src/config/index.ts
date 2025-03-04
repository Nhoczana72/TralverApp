import {Platform} from 'react-native';
import Config from 'react-native-config';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export const name = Config.ENV || 'Dev';
export const env_set: any = {
  Dev: {
    mqtt: 'mqtt://vernemq.altacloud.biz:1883',
    clientId: '000011113',
    API_BASE_URL: 'https://vcpmc-api.vcpmc.org/api/',
    APP_NAME: 'MOBILE',
    fvers: '0.0.1',
    codePush: Platform.select({
      ios: {
        production: 'Niq-KUNKgapnzYLsH_uFqaJK0ROwDijayB9yZ',
      },
      android: {
        production: '_WUX0ebR9Ai-bsKtqxx1pE2H38llA5IvUyNuR',
      },
    }),
  },
  Pro: {
    mqtt: 'mqtt://vernemq.altacloud.biz:1883',
    clientId: '000011113',
    API_BASE_URL: 'https://vcpmc-api.vcpmc.org/api/',
    APP_NAME: 'MOBILE',
    fvers: '0.0.1',
    codePush: Platform.select({
      ios: {
        production: 'Niq-KUNKgapnzYLsH_uFqaJK0ROwDijayB9yZ',
      },
      android: {
        production: 'HGlo3ryjhYdNu3EyBSRQKKwkqOIwyKvRSKKeT',
      },
    }),
  },
};

export const MIRA_CODE = {
  OPH_ACTIVATE: 1,
  OPH_GROUP_UPDATE: 3,
  OPH_MEDIA_HTTP: 67,
};
export const animate = {
  fadeIn: {
    from: {
      opacity: 0,
      marginLeft: widthPercentageToDP(100),
    },
    to: {
      opacity: 1,
      marginLeft: widthPercentageToDP(0),
    },
  },
  fadeIn1: {
    from: {
      opacity: 0.1,
    },
    to: {
      opacity: 1,
    },
  },
  zoomIn: {
    from: {
      opacity: 0.1,
    },
    to: {
      opacity: 1,
    },
  },
};
