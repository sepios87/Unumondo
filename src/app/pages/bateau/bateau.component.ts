import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import { Bateau } from 'src/app/modeles/bateau';
import { ExpeditionBateau } from 'src/app/modeles/expeditionBateau';
import { BateauService } from 'src/app/services/bateau.service';
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import Globe from 'globe.gl';

@Component({
  selector: 'app-bateau',
  templateUrl: './bateau.component.html',
  styleUrls: ['./bateau.component.scss']
})
export class BateauComponent implements OnInit, AfterViewInit {

  @ViewChild('globeGL') el?: ElementRef<HTMLElement>;

  bateau?: Bateau;
  expeditionsBateau?: ExpeditionBateau[];

  constructor(
    private _bateauService: BateauService,
    private _titleService: Title,
    private _metaService: Meta,
    private _translate: TranslateService
  ) { }

  async ngOnInit(): Promise<void> {
    this._getBateau();
    this._getExpeditionsBateau();
    this._titleService.setTitle(await firstValueFrom(this._translate.get('title.boat')) + ' - Unumondo');
    this._metaService.addTags([
      {
        name: 'description',
        content: await firstValueFrom(this._translate.get('description.boat'))
      },
      {
        name: 'robots',
        content: 'index, follow'
      }
    ]);
  }

  ngAfterViewInit() {
    // Afficher le globe après avoir initialisé la vue
    const myGlobe = Globe();
    if (this.el) {
      myGlobe(this.el.nativeElement)
        .globeImageUrl("/assets/images/terre.webp")
        .bumpImageUrl("https://unpkg.com/three-globe@2.21.3/example/images/earth-topology.webp")
        .backgroundColor("rgba(0, 0, 0, 0)")
        .showAtmosphere(false)
        .height(600)
        ;

      const controls: any = myGlobe.controls();
      controls.enableZoom = false;
      controls.autoRotate = true;
    }

  }

  /**
   * Affiche les informations du bateau
   * @private
   */
  private _getBateau(): void {
    this._bateauService.getBateau().then(bateau => this.bateau = bateau);
  }

  /**
   * Affiche les expéditions réalisées par le bateau
   * @private
   */
  private _getExpeditionsBateau(): void {
    this._bateauService.getExpeditionsBateau().then(expeditions => this.expeditionsBateau = expeditions);
  }

  trackById = (_: number, item: any): string => item.id;

}
