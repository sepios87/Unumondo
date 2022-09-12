import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/modeles/film';
import { MediathequeService } from 'src/app/services/mediatheque.service';

@Component({
  selector: 'app-films-mediatheque',
  templateUrl: './films-mediatheque.component.html',
  styleUrls: ['./films-mediatheque.component.scss']
})
export class FilmsMediathequeComponent implements OnInit {

  films: Film[] = [];

  constructor(
    private _mediathequeService: MediathequeService,
  ) { }

  ngOnInit(): void {
    this._getFilms();
  }

  private _getFilms(): void {
    this._mediathequeService.getFilms().then(films => this.films = films);
  }

  trackById = (_: number, item: any): string => item.id;

}
