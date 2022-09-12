import { Component, OnInit } from '@angular/core';
import { Presse } from 'src/app/modeles/presse';
import { SwiperItem } from 'src/app/modeles/swiperItem';
import { MediathequeService } from 'src/app/services/mediatheque.service';

@Component({
  selector: 'app-presse-mediatheque',
  templateUrl: './presse-mediatheque.component.html',
  styleUrls: ['./presse-mediatheque.component.scss']
})
export class PresseMediathequeComponent implements OnInit {

  presses: Presse[] = [];

  constructor(
    private _mediathequeService: MediathequeService,
  ) { }

  ngOnInit(): void {
    this._getArticles();
  }

  private _getArticles(): void {
    this._mediathequeService.getPresses().then(presses => this.presses = presses);
  }

  // TODO convertir en variable
  getSwiperList(): SwiperItem[] {
    return this.presses.map(p => {
      return new SwiperItem(p.id, p.image, p.titre, p.journal, p.lien);
    });
  }

}
