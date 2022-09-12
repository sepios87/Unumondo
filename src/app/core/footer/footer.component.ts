import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { faYoutube, faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsletterService } from 'src/app/services/newsletter.service';
import {AssociationService} from "../../services/association.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // Icons des réseaux sociaux
  readonly faYoutube = faYoutube;
  readonly faInstagram = faInstagram;
  readonly faLinkedin = faLinkedin;
  readonly faFacebook = faFacebook;
  readonly faEnvelope= faEnvelope;

  // validation du formulaire d'adhésion à la newsletter
  newsletterForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  youtube?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  email?: string;

  constructor(
    private _fb: FormBuilder,
    private _newsletterService: NewsletterService,
    private _associationService: AssociationService,
    private _modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.getSocials();
  }

  /**
   * Ouvrir la modale de contribution
   **/
  openModalContribuer(): void {
    this._modalService.openContribuer();
  }

  /**
   * Adhésion à la newsletter
   */
  subscribe(): void {
    if (this.newsletterForm.valid) {
      this._newsletterService.addEmailNewsLetters(this.newsletterForm.value.email);
      this.newsletterForm.reset();
    }
  }

  /**
   * Récupérer les liens des réseaux sociaux
   */
  getSocials(): void {
    this._associationService.getAssociation().then(data => {
      this.youtube = data?.youtube;
      this.instagram = data?.instagram;
      this.linkedin = data?.linkedin;
      this.facebook = data?.facebook;
      this.email = 'mailto:' + data?.mail;
    })
  }

}
