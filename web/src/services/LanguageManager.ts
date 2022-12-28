import siteParams from '../configs/params.json';
import { LanguageTypes } from '../models/LanguageTypes.model';

export default class LanguageManager {
  getActiveLanguage(): LanguageTypes {
    const key = siteParams.localStorageKey;
    let lang = sessionStorage.getItem(key);

    if (!lang) {
      sessionStorage.setItem(key, 'en-US');
      lang = 'en-US';
    }

    return lang as LanguageTypes;
  }
}