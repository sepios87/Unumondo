import { Component, Input } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Membre } from 'src/app/modeles/membre';

@Component({
  selector: 'app-vignette-membre',
  templateUrl: './vignette-membre.component.html',
  styleUrls: ['./vignette-membre.component.scss']
})
export class VignetteMembreComponent {

  @Input() membre?: Membre;
  @Input() fonction?: string;
  @Input() showInfos: boolean = true;
  @Input() summary: boolean = false;
  @Input() numberVolunteer?: number;

  readonly faInstagram = faInstagram;
  readonly faFacebook = faFacebook;
  readonly faGlobe = faGlobe;
  readonly faTwitter = faTwitter;
  readonly faLinkedin = faLinkedin;
  readonly faYoutube = faYoutube;

  constructor() { }
}
