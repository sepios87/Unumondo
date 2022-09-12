import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { NewsletterService } from 'src/app/services/newsletter.service';
import {Meta, Title} from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  estEnvoye: boolean = false;

  // Formulaire de newsletters
  newsletterForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private _fb: FormBuilder,
    private _newsletterService: NewsletterService,
    private _modalService: ModalService,
    private _titleService: Title,
    private _translate: TranslateService,
    private _metaService: Meta
  ) { }

  async ngOnInit(): Promise<void> {
    this._titleService.setTitle(await firstValueFrom(this._translate.get('title.contact')) + ' - Unumondo');
    this._metaService.addTags([
      {
        name: 'description',
        content: await firstValueFrom(this._translate.get('description.contact'))
      },
      {
        name: 'robots',
        content: 'index, follow'
      }
    ]);
  }

  /**
   * Ajoute l'utilisateur à la liste de diffusion de la newsletter
   */
  subscribe(): void {
    if (this.newsletterForm.valid && !this.estEnvoye) {
      this._newsletterService.addEmailNewsLetters(this.newsletterForm.value.email);
      this.estEnvoye = true;
      this.newsletterForm.reset();
    }
  }

  /**
   * Ouvre la modale de don
   */
  openModalContribuer(): void {
    this._modalService.openContribuer();
  }

}
