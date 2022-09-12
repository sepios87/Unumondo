import { Component, OnInit } from '@angular/core';
import { Chiffre } from 'src/app/modeles/chiffre';
import { Mission } from 'src/app/modeles/mission';
import { Association } from 'src/app/modeles/association';
import { AssociationService } from 'src/app/services/association.service';
import { Meta, Title } from "@angular/platform-browser";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  association?: Association;
  missions: Mission[] = [];
  chiffres: Chiffre[] = [];

  constructor(
    private _associationService: AssociationService,
    private _titleService: Title,
    private _metaService: Meta,
    private _translate: TranslateService,
  ) { }

  async ngOnInit(): Promise<void> {
    this._titleService.setTitle('Unu mondo');
    this._metaService.addTags([
      {
        name: 'keywords',
        content: 'Unu mondo, Expedition, Expeditions, Voile, Navigation, Association, Sciences, Education, Pédagogie'
      },
      {
        name: 'description',
        content: await firstValueFrom(this._translate.get('description.home'))
      },
      {
        name: 'robots',
        content: 'index, follow'
      }
    ]);
    // Pour ne pas surcharger le reseau avec plusieurs requetes en même temps et afficher plus vite les expéditions
    await this._getAssociation();
    this._getMissions();
    this._getChiffres();
  }

  private async _getAssociation(): Promise<void> {
    this.association = await this._associationService.getAssociation();
  }

  private _getMissions(): void {
    this._associationService.getMissions().then(missions => this.missions = missions);
  }

  private _getChiffres(): void {
    this._associationService.getChiffres().then(chiffres =>
      this.chiffres = chiffres.filter(e => e.associationId !== null)
    );
  }


}
