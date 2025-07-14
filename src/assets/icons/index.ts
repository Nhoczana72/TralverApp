const ICON = {
  FACEBOOK: require('./icon_facebook.jpg'),
  GOOGLE: require('./icon_google.png'),
};

export const getIcons = (source: keyof typeof ICON) => {
  return ICON[source];
};
