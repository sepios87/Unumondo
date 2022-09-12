import { Component, Input, OnInit } from '@angular/core';
import { Niveau } from 'src/app/modeles/niveau';
import { SwiperItem } from 'src/app/modeles/swiperItem';
import { PedagogieService } from 'src/app/services/pedagogie.service';

@Component({
  selector: 'app-fiches-video-peda',
  templateUrl: './fiches-video-peda.component.html',
  styleUrls: ['./fiches-video-peda.component.scss']
})
export class FichesVideoPedaComponent implements OnInit {

  @Input() niveaux: Niveau[] = [];

  fichesVideo: SwiperItem[] = [];

  constructor(
    private _pedagogieService: PedagogieService,
  ) { }

  ngOnInit(): void {
    this._getFichesVideo();
  }

  private _getFichesVideo(): void {
    this._pedagogieService.getFichesVideo().then(fichesVideo => 
      this.fichesVideo = fichesVideo.map(f =>
        new SwiperItem(f.id, f.miniature, f.nom + ' - ' + f.duree + 'min', this._getNiveauFromNiveauId(f.niveauId), f.lien)
      )
    );
  }

  private _getNiveauFromNiveauId(niveauId: string): string {
    return this.niveaux.find(e => e.id === niveauId)?.nom ?? '';
  }

}
