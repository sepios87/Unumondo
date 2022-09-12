import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { PedagogieService } from 'src/app/services/pedagogie.service';
import { Niveau } from 'src/app/modeles/niveau';
import { Meta, Title } from "@angular/platform-browser";
import { AssociationService } from 'src/app/services/association.service';
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Asset } from 'src/app/modeles/asset';

@Component({
  selector: 'app-pedagogie',
  templateUrl: './pedagogie.component.html',
  styleUrls: ['./pedagogie.component.scss']
})
export class PedagogieComponent implements OnInit {

  // Ici niveaux est undefined au debut sinon il ne passe pas dans les element enfant parfois après avoir changé
  niveaux?: Niveau[];
  plaquette?: Asset;

  constructor(
    private _pedagogieService: PedagogieService,
    private _associationService: AssociationService,
    private _titleService: Title,
    private _translate: TranslateService,
    private _metaService: Meta
  ) { }

  // options du carousel
  customOptions: OwlOptions = {
    loop: true,
    center: true,
    dots: false,
    navSpeed: 1000,
    margin: 50,
    autoWidth: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      }
    }
  }

  async ngOnInit(): Promise<void> {
    this._titleService.setTitle(await firstValueFrom(this._translate.get('title.pedagogy')) + ' - Unu mondo');
    this._metaService.addTags([
      {
        name: 'description',
        content: await firstValueFrom(this._translate.get('description.pedagogy'))
      },
      {
        name: 'robots',
        content: 'index, follow'
      }
    ]);
    this._getNiveaux();
    this._getPlaquetteAssociation();
  }

  /**
   * Récupère les niveaux scolaires possibles
   * @private
   */
  private _getNiveaux(): void {
    this._pedagogieService.getNiveaux().then(niveaux => this.niveaux = niveaux);
  }

  /**
   * Récupère les informations de l'association
   * @private
   */
  private _getPlaquetteAssociation(): void {
    this._associationService.getPlaquetteAssociation().then(plaquette =>
      this.plaquette = plaquette
    );
  }

}
