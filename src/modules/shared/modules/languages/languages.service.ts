import { isEmpty } from 'lodash';
import { LanguagesDao } from './dao/languages.dao';


export default class LanguagesService {
  private languagesDao= new LanguagesDao();

  getById(languageId: number) {
    return this.languagesDao.getById(languageId);
  }
}
