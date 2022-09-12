import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { environment } from 'src/environments/environment';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AssociationService } from 'src/app/services/association.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit, OnDestroy {

  isSendContactForm = false;
  limite: number = 0

  private _statusSubscription?: Subscription;

  // Icons
  readonly faEnvelope = faEnvelope;
  readonly faYoutube = faYoutube;
  readonly faInstagram = faInstagram;
  readonly faLinkedin = faLinkedin;
  readonly faFacebook = faFacebook;

  email?: string;
  youtube?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;

  // Formulaire de contact
  contactForm: FormGroup = this._fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    status: ['particulier'],
    company: [''],
    school: [''],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required]],
    rgpd: ['', [Validators.required]]
  });

  constructor(
    private _http: HttpClient,
    private _toast: HotToastService,
    private _fb: FormBuilder,
    private _translate: TranslateService,
    private _associationService: AssociationService,
  ) { }

  ngOnInit(): void {
    this._getSocials();
    // modifie les champs du formulaire de contact suivant le status sélectionné par l'utilisateur
    this._statusSubscription = this.contactForm.get('status')?.valueChanges.subscribe(
      (result) => {
        switch (result) {
          case 'particulier':
            this.contactForm.get('company')?.setValidators(null);
            this.contactForm.get('school')?.setValidators(null);
            break;
          case 'enseignant':
            this.contactForm.get('school')?.setValidators(Validators.required);
            this.contactForm.get('company')?.setValidators(null);
            break;
          case 'entreprise':
            this.contactForm.get('company')?.setValidators(Validators.required);
            this.contactForm.get('school')?.setValidators(null);
            break;
        }
        this.contactForm.get('company')?.updateValueAndValidity();
        this.contactForm.get('school')?.updateValueAndValidity();
      }
    );
  }


  ngOnDestroy(): void {
    this._statusSubscription?.unsubscribe();
  }

  /**
   * Affiche les réseaux sociaux de l'association
   * @private
   */
  private _getSocials(): void {
    this._associationService.getAssociation().then(association => {
      this.email = 'mailto:' + association?.mail;
      this.youtube = association?.youtube;
      this.instagram = association?.instagram;
      this.linkedin = association?.linkedin;
      this.facebook = association?.facebook;
    });
  }

  /**
   * Gère la validation et l'envoi du formulaire de contact
   */
  send(): void {
    this.isSendContactForm = true;
    if (this.contactForm.valid && this.limite < 3) {
      this._http.post(environment.directusUrl + 'contact', this.contactForm.value).pipe(
        this._toast.observe(
          {
            loading: this._translate.instant('toast.loading'),
            success: () => this._translate.instant('toast.success'),
            error: () => this._translate.instant('toast.error'),
          }
        ),
      ).subscribe(() => {
        this.limite++;
        this.contactForm.reset();
        this.contactForm.patchValue({
          status: 'particulier',
        });
      });
    }
  }

}
