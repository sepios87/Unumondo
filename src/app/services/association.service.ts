import { Injectable } from '@angular/core';
import { Association } from 'src/app/modeles/association';
import { Chiffre } from 'src/app/modeles/chiffre';
import { Mission } from 'src/app/modeles/mission';
import { directus } from 'src/constantes';
import { TraductionService } from './traduction.service';
import {Asset} from "../modeles/asset";

@Injectable({
  providedIn: 'root'
})
export class AssociationService {

  private association?: Association;
  private missions: Mission[] = [];
  private chiffres: Chiffre[] = [];

  constructor(private traductionService: TraductionService) { }

  /**
   * Récupère toutes les données venant de l'item Association
   * suivant la langue sélectionnée
   *
   *
   * @return [Promise<Association | undefined>]
   */
  async getAssociation(): Promise<Association | undefined> {
    // vérifie si l'item n'a pas déjà été chargé
    if (!this.association) {
      const res = await directus.items('association').readByQuery({
        // champs retournés via l'api
        fields: [
          '*',
          'traductions.*',
        ],
        // filtre sur la langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si la donnée existe
      if (res.data) this.association = Association.fromDirectusData(res.data);
    }
    // retourne l'item en cache
    return this.association;
  }

  /**
   * Récupère la plaquette de l'association suivant la langue de l'utilisateur
   * @return [Promise<string | undefined>]
   */
  async getPlaquetteAssociation(): Promise<Asset | undefined> {
    if (!this.association) {
      const res = await directus.items('association').readByQuery({
        // champs retournés via l'api
        fields: [
          'traductions.plaquette_pedagogie',
        ],
        // filtre sur la langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si la donnée existe
      if (res.data) return Asset.fromDirectusData(res.data);
      // retourne l'item en cache
    }
    return this.association?.plaquettePedagogie;
  }

  /**
   * Retourne toutes les données de l'item Missions
   * @return [Promise<Mission[]>]
   */
  async getMissions(): Promise<Mission[]> {
    // vérifie si la donnée n'a pas déjà été chargée
    if (!this.missions.length) {
      const res = await directus.items('missions').readByQuery({
        limit : 4,
        // champs de retour de l'api
        fields: [
          '*',
          'traductions.*',
        ],
        // langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si la donnée existe
      if (res.data) this.missions = res.data.map(e => Mission.fromDirectusData(e));
    }
    // retourne la donnée en cache
    return this.missions;
  }

  /**
   * Retourne toutes les données de l'item Chiffres
   * @return [Promise<Chiffre[]>]
   */
  async getChiffres(): Promise<Chiffre[]> {
    // vérifie si la donnée n'a pas déjà été chargée
    if (!this.chiffres.length) {
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
      if (res.data) this.chiffres = res.data.map(e => Chiffre.fromDirectusData(e));
    }
    // retourne la donnée en cache
    return this.chiffres;
  }
}
