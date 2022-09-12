import { Injectable } from '@angular/core';
import { Chiffre } from 'src/app/modeles/chiffre';
import { Expedition } from 'src/app/modeles/expedition';
import { Temoignage } from 'src/app/modeles/temoignage';
import { directus } from 'src/constantes';
import { TraductionService } from './traduction.service';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionService {

  private expeditions: Expedition[] = [];
  private temoignages: Temoignage[] = [];
  private _chiffres: Chiffre[] = [];

  constructor(private traductionService: TraductionService) { }

  /**
   * Retourne les données de l'item Expédition
   * @return [Promise<Expedition[]>]
   */
  async getExpeditions(): Promise<Expedition[]> {
    // vérifie si la donnée n'a pas été chargée
    if (!this.expeditions.length) {
      const res = await directus.items('expeditions').readByQuery({
        limit: 30,
        // trie les données par data
        sort: ["-date"],
        // champs retournés par l'api
        fields: [
          'id',
          'traductions.nom',
          'image_slider',
          'date',
        ],
        // langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si la donnée existe
      if (res.data) this.expeditions = res.data.map(e => Expedition.fromDirectusData(e));
    }
    // retourne la donnée en cache
    return this.expeditions;
  }

  /**
 * Retourne les données de l'item Expédition
 * @return [Promise<Expedition[]>]
 */
  async getExpeditionById(id: string): Promise<Expedition | undefined> {
    // vérifie si la donnée n'a pas été chargée
      const res = await directus.items('expeditions').readOne(id, {
        // champs retournés par l'api
        fields: [
          '*',
          'traductions.*',
          'chiffres.chiffres_id.valeur',
          'chiffres.chiffres_id.traductions.nom',
          'membres.membres_id',
          'image1.*',
          'image2.*',
          'image3.*',
          'image4.*',
        ],
        // langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si la donnée existe
      if (res) return Expedition.fromDirectusData(res);
      return;
  }

  /**
   * Retourne les données de l'item Témoignages
   * @return [Promise<Temoignage[]>]
   */
  async getTemoignages(): Promise<Temoignage[]> {
    // vérifie si la donnée n'a pas été chargée
    if (!this.expeditions.length) {
      const res = await directus.items('temoignages').readByQuery({
        // champs retournés par l'api
        fields: [
          '*',
          'traductions.*',
          'photo.*',
        ],
        // langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si la donnée existe
      if (res.data) this.temoignages = res.data.map(e => Temoignage.fromDirectusData(e));
    }
    // retourne la donnée en cache
    return this.temoignages;
  }

  async getTemoignagesByExpeditionId(idExpedition: string): Promise<Temoignage[]> {
    // vérifie si la donnée n'est pas chargée
    if (!this.temoignages.length) {
      const res = await directus.items('temoignages').readByQuery({
        // champs retournés par l'api
        fields: [
          '*',
          'traductions.*',
          'photo.*',
        ],
        // filtre les données retournées
        filter: {
          expedition: {
            _eq: idExpedition
          }
        },
        // langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si la donnée existe
      return res.data ? res.data.map(e => Temoignage.fromDirectusData(e)) : [];
    }
    // retourne la donnée chargée + filtrée si elle n'a pas été filtrée
    return this.temoignages.filter(e => e.expeditionId == idExpedition);
  }

  async getChiffresByExpeditionId(expeditionId: string): Promise<Chiffre[]> {
    // vérifie si la donnée n'a pas déjà été chargée
    if (!this._chiffres.length) {
      const res = await directus.items('chiffres').readByQuery({
        limit: 20,
        // champs de retour de l'api
        fields: [
          '*',
          'traductions.*',
        ],
        // langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si la donnée existe
      if (res.data) this._chiffres = res.data.map(e => Chiffre.fromDirectusData(e));
    }
    // retourne la donnée en cache
    return this._chiffres.filter(e => e.expeditionId == expeditionId);
  }
}
