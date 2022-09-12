import { Injectable } from '@angular/core';
import { Equipe } from 'src/app/modeles/equipe';
import { Fonction } from 'src/app/modeles/fonction';
import { Membre } from 'src/app/modeles/membre';
import { directus } from 'src/constantes';
import { TraductionService } from './traduction.service';

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private membres: Membre[] = [];
  private equipes: Equipe[] = [];
  private fonctions: Fonction[] = [];

  constructor(private traductionService: TraductionService) { }

  /**
   * Retourne les données de l'item Membre
   * @return [Promise<Membre[]>]
   */
  async getMembres(): Promise<Membre[]> {
    // vérifie si les données ne sont pas chargées
    if (!this.membres.length) {
      const res = await directus.items('membres').readByQuery({
        limit: 3000,
        // champs retournés par l'api
        fields: [
          '*',
          'photo.*',
        ],
      });
      // vérifie si les données existent
      if (res.data) this.membres = res.data.map(e => Membre.fromDirectusData(e));
    }
    // retourne les données en cache
    return this.membres;
  }

  /**
   * Retourne les données de l'item Equipe
   * @return [Promise<Equipe[]>]
   */
  async getEquipes(): Promise<Equipe[]> {
    // vérifie si les données ne sont pas chargées
    if (!this.equipes.length) {
      const res = await directus.items('equipes').readByQuery({
        // champs retournés par l'api
        fields: [
          '*.*',
        ],
        // langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si les données existent
      if (res.data) this.equipes = res.data.map(e => Equipe.fromDirectusData(e));
    }
    // retourne les données en cache
    return this.equipes;
  }

  /**
   * Retourne les données de l'item Fonction
   * @return [Promise<Fonction[]>]
   */
  async getFonctions(): Promise<Fonction[]> {
    // vérifie si les données ne sont pas chargées
    if (!this.fonctions.length) {
      const res = await directus.items('fonctions').readByQuery({
        // champs retournés par l'api
        fields: [
          '*.*',
        ],
        // langue sélectionnée
        deep: this.traductionService.getDeepTrad()
      });
      // vérifie si les données existent
      if (res.data) this.fonctions = res.data.map(e => Fonction.fromDirectusData(e));
    }
    // retourne les données en cache
    return this.fonctions;
  }
}
