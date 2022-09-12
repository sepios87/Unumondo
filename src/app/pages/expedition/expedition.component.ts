import { Component, OnInit } from '@angular/core';
import { Chiffre } from 'src/app/modeles/chiffre';
import { ExpeditionService } from 'src/app/services/expedition.service';
import { ActivatedRoute } from '@angular/router';
import { Expedition } from 'src/app/modeles/expedition';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { Fonction } from 'src/app/modeles/fonction';
import { Temoignage } from 'src/app/modeles/temoignage';
import { MembreService } from 'src/app/services/membre.service';
import { Title } from "@angular/platform-browser";
import { SwiperItem } from 'src/app/modeles/swiperItem';

@Component({
  selector: 'app-expedition',
  templateUrl: './expedition.component.html',
  styleUrls: ['./expedition.component.scss']
})
export class ExpeditionComponent implements OnInit {

  expedition?: Expedition;
  membres: SwiperItem[] = [];
  fonctions: Fonction[] = [];
  temoignages: Temoignage[] = [];
  chiffres: Chiffre[] = [];

  // options pour le carousel
  customOptions: OwlOptions = {
    loop: true,
    center: false,
    dots: false,
    navSpeed: 1000,
    margin: 50,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      }
    }
  }

  constructor(
    private _expeditionService: ExpeditionService,
    private _route: ActivatedRoute,
    private _membreService: MembreService,
    private _titleService: Title
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this._route.snapshot.paramMap.get('id');
    if (id != null) {
      await this._getExpedition(id);
      this._titleService.setTitle(this.expedition?.nom + ' - Unu mondo');
      this._getChiffresExpedition(id);
      this._getTemoignages(id);
      this._getMembres();
      this._getFonctions();
    }
  }

  /**
   * Récupère les informations d'une expédition par son identifiant
   * @param {string} id
   * @private
   */
  private async _getExpedition(id: string): Promise<void> {
    this.expedition = await this._expeditionService.getExpeditionById(id);
  }

  /**
   * Récupère les chiffres issus d'une expédition
   * @param {string} id
   * @private
   */
  private _getChiffresExpedition(id: string) {
    this._expeditionService.getChiffresByExpeditionId(id).then(chiffres =>
      this.chiffres = chiffres
    )
  }

  /**
   * Récupère les membres issus d'une expédition
   * @private
   */
  private _getMembres(): void {
    this._membreService.getMembres().then(membres => this.membres = membres.filter(m =>
      this.expedition && this.expedition?.membresId?.includes(m.id)).map(m =>
        new SwiperItem(m.id, m.photo, m.prenom + ' ' + m.nom, this.getFonctionById(m.fonctionsId[0])
        )
      )
    );
  }

  /**
   * Récupère toutes les fonctions
   * @private
   */
  private _getFonctions(): void {
    this._membreService.getFonctions().then(fonctions => this.fonctions = fonctions);
  }

  /**
   * Récupère les témoignages issus d'une expédition
   * @param {string} id
   * @private
   */
  private _getTemoignages(id: string): void {
    this._expeditionService.getTemoignagesByExpeditionId(id).then(temoignages => this.temoignages = temoignages);
  }

  /**
   * Affiche le nom de la fonction suivant son identifiant
   * @param {string} id
   */
  getFonctionById(id: string): string {
    return this.fonctions.find(fonction => fonction.id == id)?.nom ?? '';
  }

  counter(n: number) {
    return Array(n)
  }

  trackById = (_: number, item: any): string => item.id;

}
