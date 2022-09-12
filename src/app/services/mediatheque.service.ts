import { Injectable } from '@angular/core';
import { Film } from 'src/app/modeles/film'
import { Presse } from 'src/app/modeles/presse';
import { directus } from 'src/constantes';
import { TraductionService } from './traduction.service';
import {Collection} from "../modeles/collection";

@Injectable({
  providedIn: 'root'
})
export class MediathequeService {

  private presses: Presse[] = [];
  private films: Film[] = [];
  private collections: Collection[] = [];

  constructor(private traductionService: TraductionService) { }

  async getCollections(): Promise<Collection[]> {
    if (!this.collections.length) {
      const res = await directus.items('collections').readByQuery({
        fields: [
          'id',
          'traductions.*',
          'miniature',
          'langues',
          'nom',
        ],
        filter: {
          langues: {
            _contains: this.traductionService.langueActuelle
          },
        },
      });
      if (res.data) this.collections = res.data.map(collection => Collection.fromDirectusData(collection));
    }
    return this.collections;
  }

  async getCollectionById(id: string): Promise<Collection | undefined> {
      const res = await directus.items('collections').readOne(id, {
        fields: [
          '*',
          'videos.videos_id.*',
          'podcasts.podcasts_id.*',
          'photos.directus_files_id'
        ],
      });
      if (res) return Collection.fromDirectusData(res);
      return;
  }

  /**
   * Retourne les données de l'item Presse
   * @return [Promise<Presse[]>]
   */
  async getPresses(): Promise<Presse[]> {
    // vérifie si les données ne sont pas chargées
    if (!this.presses.length) {
      const res = await directus.items('presses').readByQuery({
        limit: 3000,
        // champs retournés par l'api
        fields: [
          '*',
          'traductions.*',
          'image_article.*',
        ],
        // langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si la donnée existe
      if (res.data) this.presses = res.data.map(e => Presse.fromDirectusData(e));
    }
    // retourne les données en cache
    return this.presses;
  }

  /**
   * Retourne les données de l'item Film
   * @return [Promise<Film[]>]
   */
  async getFilms(): Promise<Film[]> {
    // vérifie si les données ne sont pas chargées
    if (!this.films.length) {
      const res = await directus.items('films').readByQuery({
        limit: 100,
        // champs retournés par l'api
        fields: [
          '*',
          'traductions.*',
          'palmares.directus_files_id',
          'affiche.*',
        ],
        //langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si la donnée existe
      if (res.data) this.films = res.data.map(e => Film.fromDirectusData(e));
    }
    // retourne les données en cache
    return this.films;
  }

}
