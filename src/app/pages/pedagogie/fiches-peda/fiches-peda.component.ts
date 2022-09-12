import { Component, Input, OnInit } from '@angular/core';
import { Niveau } from 'src/app/modeles/niveau';
import { PedagogieService } from 'src/app/services/pedagogie.service';
import { SwiperItem } from 'src/app/modeles/swiperItem';
import { Fiche } from 'src/app/modeles/fiche';

@Component({
  selector: 'app-fiches-peda',
  templateUrl: './fiches-peda.component.html',
  styleUrls: ['./fiches-peda.component.scss']
})
export class FichesPedaComponent implements OnInit {

  @Input() niveaux: Niveau[] = [];

  fichesFilter: SwiperItem[] = [];
  fiches: Fiche[] = [];

  constructor(
    private _pedagogieService: PedagogieService,
  ) { }

  ngOnInit(): void {
    this._getFiches();
  }

  private _getFiches(): void {
    this._pedagogieService.getFiches().then(fiches => {
      this.fiches = fiches;
      this._setFichesFilter(this.fiches);
    }
    );
  }

  private _getNiveauFromNiveauId(niveauId: string): string {
    return this.niveaux.find(e => e.id === niveauId)?.nom ?? '';
  }

  private _setFichesFilter(fiches: Fiche[]): void {
    this.fichesFilter = fiches.map(f =>
      new SwiperItem(f.id, f.vignette, f.nom, this._getNiveauFromNiveauId(f.niveauId), f.document.getUrl())
    );
  }

  onSearch(e: any): void {
    const value = e.value.toLowerCase();
    this._setFichesFilter(this.fiches.filter(f => this._getNiveauFromNiveauId(f.niveauId).toLowerCase().includes(value) || f.nom.toLowerCase().includes(value)));
  }

}
