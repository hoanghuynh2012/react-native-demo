import I18n from 'react-native-i18n';

import {vnGeneral, enGeneral} from '~constant';

const en = {...enGeneral};

const vn = {...vnGeneral};
I18n.fallbacks = true;

I18n.translations = {
  en,
  vn,
};

I18n.defaultLocale = 'en-US';
I18n.locale = 'en-US';

export default I18n;
