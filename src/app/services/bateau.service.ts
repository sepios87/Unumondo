import { Injectable } from '@angular/core';
import { Bateau } from 'src/app/modeles/bateau';
import { ExpeditionBateau } from 'src/app/modeles/expeditionBateau';
import { directus } from 'src/constantes';
import { TraductionService } from './traduction.service';

@Injectable({
  providedIn: 'root'
})
export class BateauService {

  private bateau?: Bateau;
  private expeditionsBateau: ExpeditionBateau[] = [];

  constructor(private traductionService: TraductionService) { }

  /**
   * Retourne les données de l'item Bateau
   * @return [Promise<Bateau | undefined>]
   */
  async getBateau(): Promise<Bateau | undefined> {
    // vérifie si la donnée n'a pas été chargée
    if (!this.bateau) {
      const res = await directus.items('bateau').readByQuery({
        // champs retournés par l'api
        fields: [
          '*',
          'traductions.*'
        ],
        // langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si la donnée existe
      return res.data ? Bateau.fromDirectusData(res.data) : undefined;
    }
    // retourne la donnée en cache
    return this.bateau;
  }

  /**
   * Retourne les données de l'item ExpéditionBateau
   * @return [Promise<ExpeditionBateau[] | undefined>]
   */
  async getExpeditionsBateau(): Promise<ExpeditionBateau[]> {
    // vérifie si la donnée n'a pas été déjà chargée
    if (!this.expeditionsBateau.length) {
      const res = await directus.items('expeditions_bateau')
        .readByQuery({
          limit: 3,
          // champs retournés par l'api
          fields: [
            '*',
            'traductions.*'
          ],
          // langue sélectionnée
          deep: this.traductionService.getDeepTrad()
        });
      // vérifie si la donnée existe
      if (res.data)
        this.expeditionsBateau = res.data.map(e => ExpeditionBateau.fromDirectusData(e));
    }
    // retourne la donnée en cache
    return this.expeditionsBateau;
  }
}
