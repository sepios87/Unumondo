import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export enum langues {
  fr = "fr-FR",
  en = "en-US"
}

@Injectable({
  providedIn: 'root'
})
export class TraductionService {

  private _langueActuelle: langues = this._getCurrentLanguage();

  langueActuelle: langues = this._langueActuelle;

  constructor(private _translate: TranslateService) {
    this.init();
  }

  init(): void {
    this._translate.addLangs([langues.fr, langues.en]);
    this._translate.setDefaultLang(langues.en);
    this._langueActuelle = this._getCurrentLanguage();
    this._translate.use(this._langueActuelle);
  }

  getDeepTrad(): any {
    return {
      traductions: {
        _filter: {
          languages_code: {
            _eq: this._langueActuelle
          }
        }
      }
    }
  }

  setLanguage(langue: langues): void {
    this._langueActuelle = langue;
    localStorage.setItem('langueactuelle', langue);
    location.reload();
  }

  private _getCurrentLanguage(): langues {
    const storageLanguage = localStorage.getItem('langueactuelle');
    if (storageLanguage) return storageLanguage as langues;

    const lang = navigator.language;
    const isFr = lang == 'fr' || lang == 'fr-FR';
    return this._langueActuelle ?? (isFr ? langues.fr : langues.en);
  }

}
