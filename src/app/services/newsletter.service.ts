import { Injectable } from '@angular/core';
import { directus } from 'src/constantes';
import { HotToastService } from '@ngneat/hot-toast';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private _toast: HotToastService, private _translate: TranslateService) { }

  async addEmailNewsLetters(email: string): Promise<void> {
    try {
      await directus.items('adherents_newsletters').createOne({
        mail: email
      })
      this._toast.success(this._translate.instant('toast.newsletter-success'));
    } catch (e) {
      this._toast.error(this._translate.instant('toast.error'));
    }
  }
}
