import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { montants } from 'src/constantes';
import { langues, TraductionService } from 'src/app/services/traduction.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-contribuer',
  templateUrl: './contribuer.component.html',
  styleUrls: ['./contribuer.component.scss']
})
export class ContribuerComponent implements OnInit {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  // Liste des montants à proposer
  montants = montants;

  // Etat de la modale
  isDisplay: boolean = false;

  loading: boolean = false;
  submitted: boolean = false;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#FFFFFF',
        color: '#FFFFFF',
        fontWeight: '300',
        fontSize: '16px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: this._traductionService.langueActuelle === langues.fr ? 'fr' : 'en'
  };

  stripeForm: FormGroup = this._fb.group({
    amount: [5, [Validators.required]]
  });

  constructor(
    private _modalService: ModalService,
    private _http: HttpClient,
    private _fb: FormBuilder,
    private _stripeService: StripeService,
    private _traductionService: TraductionService,
    private _translateService: TranslateService,
    private _toast: HotToastService,
  ) { }

  ngOnInit(): void {
    this._modalService.watchContribuer().subscribe((isDisplay) => {
      // Await 1s for prevent close outside modale
      setTimeout(() => this.isDisplay = isDisplay == 'open', 1);
    })
  }

  /**
   * Valider le formulaire de donation
   */
  buy(): void {
    this.submitted = true;
    this.loading = true;
    const stripeData = this.stripeForm.value;
    // stripeData.name = "nom-de-test";
    this._stripeService.createToken(this.card.element)
      .subscribe((result: any) => {
        if (result.token) {
          this._http.post(environment.directusUrl + 'stripe', stripeData).subscribe((res: any) => {
            this._stripeService.confirmCardPayment(res.client_secret, {
              payment_method: {
                card: this.card.element,
                // billing_details: {
                //   name: stripeData.name
                // }
              }
            }).pipe(
              this._toast.observe(
                {
                  loading: this._translateService.instant('toast.loading_payment'),
                  success: () => this._translateService.instant('toast.success_payment'),
                  error: () => this._translateService.instant('toast.error'),
                }
              ),
            ).subscribe(() => {
              this.stripeForm.reset();
              this.submitted = false;
              this.loading = false;
              this.close();
            });
          });
        }
      });
  }

  /**
   * Fermer la modale
   */
  close(): void {
    this._modalService.closeContribuer();
  }

  /**
   * Changer la valeur du don
   * @param target 
   */
  change(target: any): void {
    this.stripeForm.patchValue(
      {
        amount: target.value
      }
    );
  }

}
