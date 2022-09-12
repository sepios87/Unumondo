import { Component, ElementRef, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { MembreService } from 'src/app/services/membre.service';
import { Membre } from 'src/app/modeles/membre';
import { Equipe } from 'src/app/modeles/equipe';
import { Fonction } from 'src/app/modeles/fonction';
import {Meta, Title} from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit, AfterViewInit {

  @ViewChildren("membreSetion") membresSection!: QueryList<ElementRef>;

  readonly faInstagram = faInstagram;

  membres: Membre[] = [];
  benevoles: Membre[] = [];
  equipes: Equipe[] = [];
  fonctions: Fonction[] = [];

  constructor(
    private _membreService: MembreService,
    private _route: ActivatedRoute,
    private _titleService: Title,
    private _translate: TranslateService,
    private _metaService: Meta
  ) { }

  async ngOnInit(): Promise<void> {
    this._getMembres();
    this._getEquipes();
    this._getFonctions();
    this._titleService.setTitle(await firstValueFrom(this._translate.get('title.team')) + ' - Unu mondo');
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

  ngAfterViewInit(): void {
    const id = this._route.snapshot.fragment;
    if (id) {
      // scroll automatiquement vers le bon élément
      this.membresSection.changes.subscribe(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }
      );
    }
  }

  /**
   * Affiche les informations sur les membres
   * @private
   */
  private _getMembres(): void {
    this._membreService.getMembres().then(membres => {
      this.membres = membres.filter(m => !m.estBenevole);
      this.benevoles = membres.filter(m => m.estBenevole);
    });
  }

  /**
   * Affiche les informations sur les équipes
   * @private
   */
  private _getEquipes(): void {
    this._membreService.getEquipes().then(equipes => this.equipes = equipes);
  }

  /**
   * Affiche les fonctions des membres
   * @private
   */
  private _getFonctions(): void {
    this._membreService.getFonctions().then(fonctions => this.fonctions = fonctions);
  }

  /**
   * Récupère les membres appartenant à l'équipe en question
   * @param {string} equipeId
   */
  getMembresWithEquipeId(equipeId: string): Membre[] {
    return this.membres.filter(e => e.equipeId === equipeId);
  }

  /**
   * Affiche le nom de la fonction en fonction son identifiant
   * @param {string} fonctionId
   */
  getFonctionsWithId(fonctionId: string): string {
    return this.fonctions.find(e => e.id === fonctionId)?.nom ?? '';
  }

  trackById = (_: number, item: any): string => item.id;

}
