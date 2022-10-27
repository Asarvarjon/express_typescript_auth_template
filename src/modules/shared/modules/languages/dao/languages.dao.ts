import KnexService from '../../../../../database/connection';

export class LanguagesDao {

  getById(languageId: number) {
    return KnexService('languages')
      .where('language_id', languageId)
      .first();
  }
}
