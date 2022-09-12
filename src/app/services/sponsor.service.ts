import {Injectable} from '@angular/core';
import { CategorieSponsors } from 'src/app/modeles/categorieSponsors';
import { Sponsor } from 'src/app/modeles/sponsor';
import { directus } from 'src/constantes';
import { TraductionService } from './traduction.service';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  private sponsors: Sponsor[] = [];
  private categories: CategorieSponsors[] = [];

  constructor(private traductionService: TraductionService) { }

  /**
   * Retourne les données de l'item Sponsor
   * @return [Promise<Sponsor[]>]
   */
  async getSponsors(): Promise<Sponsor[]> {
    // vérifie si les données ne sont pas chargées
    if (!this.sponsors.length) {
      const res = await directus.items('sponsors')
        .readByQuery({
          limit: 1000,
          // champs retournés par l'api
          fields: [
            '*'
          ],
          // langue sélectionnée
          deep: this.traductionService.getDeepTrad()
        });
      // vérifie si les données existent
      if (res.data) this.sponsors = res.data.map(e => Sponsor.fromDirectusData(e));
    }
    // retourne les données en cache
    return this.sponsors;
  }

  /**
   * Retourne les données de des sponsors principaux
   * @return [Promise<Sponsor[]>]
   */
   async getMainSponsors(): Promise<Sponsor[]> {
      const res = await directus.items('sponsors')
        .readByQuery({
          limit: 100,
          fields: [
            '*'
          ],
          filter: {
            mettre_en_avant : {
              _eq : true
            },
          },
          deep: this.traductionService.getDeepTrad()
        });
      return res.data?.map(e => Sponsor.fromDirectusData(e)) ?? [];
  }

   /**
   * Retourne les données de l'item Sponsor
   * @return [Promise<Sponsor[]>]
   */
    async getCategories(): Promise<CategorieSponsors[]> {
      // vérifie si les données ne sont pas chargées
      if (!this.categories.length) {
        const res = await directus.items('categories_sponsors')
          .readByQuery({
            // champs retournés par l'api
            fields: [
              '*',
              'traductions.nom'
            ],
            // langue sélectionnée
            deep: this.traductionService.getDeepTrad()
          });
        // vérifie si les données existent
        if (res.data) this.categories = res.data.map(e => CategorieSponsors.fromDirectusData(e));
      }
      // retourne les données en cache
      return this.categories;
    }

}
