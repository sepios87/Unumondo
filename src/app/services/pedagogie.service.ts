import { Injectable } from '@angular/core';
import { Fiche } from 'src/app/modeles/fiche';
import { FicheVideo } from 'src/app/modeles/fiche-video';
import { Niveau } from 'src/app/modeles/niveau';
import { directus } from 'src/constantes';
import { TraductionService } from './traduction.service';

@Injectable({
  providedIn: 'root'
})
export class PedagogieService {

  private fiches: Fiche[] = [];
  private fichesVideo: FicheVideo[] = [];
  private niveaux: Niveau[] = [];

  constructor(private traductionService: TraductionService) { }

  /**
   * Retourne les données de l'item Fiche
   * @return [Promise<Fiche[]>]
   */
  async getFiches(): Promise<Fiche[]> {
    // vérifie si les données ne sont pas chargées
    if (!this.fiches.length) {
      const res = await directus.items('fiches')
        .readByQuery({
          limit: 5000,
          // champs retournés par l'api
          fields: [
            '*',
            'vignette.*',
            'traductions.*'
          ],
          // filtre les retours par le status
          filter: {
            status: {
              _eq: 'published'
            },
            traductions: {
              fiche_document: {
                // Eviter de récuperer des fiches sans documents assignés (avec la langue)
                _nnull: true
              },
            },
          },
          sort: [
            'niveau'
          ],
          // langue sélectionnée
          deep: this.traductionService.getDeepTrad()
        });
      // vérifie si les données existent
      if (res.data) this.fiches = res.data.map(e => Fiche.fromDirectusData(e));
    }
    // retourne les données en cache
    return this.fiches;
  }

  /**
   * Retourne les données de l'item FicheVidéo
   * @return [Promise<FicheVideo[]>]
   */
  async getFichesVideo(): Promise<FicheVideo[]> {
    // vérifie si les données n'ont pas été chargées
    if (!this.fichesVideo.length) {
      const res = await directus.items('fiches_videos')
        .readByQuery({
          limit: 5000,
          // champs retournés par l'api
          fields: [
            '*',
            'traductions.*'
          ],
          // filtre les retours par le status
          filter: {
            status: {
              _eq: 'published'
            },
            traductions: {
              lien: {
                // Eviter de récuperer des fiches vidéo sans lien (avec la langue)
                _nnull: true
              },
            },
          },
          // langue sélectionnée
          deep: this.traductionService.getDeepTrad()
        });
      // vérifie si les données existent
      if (res.data) this.fichesVideo = res.data.map(e => FicheVideo.fromDirectusData(e));
    }
    // retourne les données en cache
    return this.fichesVideo;
  }

  async getNiveaux(): Promise<Niveau[]> {
    if (!this.niveaux.length) {
      const res = await directus.items('niveaux').readByQuery({
        fields: [
          '*',
          'traductions.*'
        ],
        deep: this.traductionService.getDeepTrad()
      });
      if (res.data) this.niveaux = res.data.map(e => Niveau.fromDirectusData(e));
    }
    return this.niveaux;
  }

  async getNiveauxById(id: string): Promise<Niveau> {
    const niveau = (await this.getNiveaux()).find(e => e.id == id);
    if (niveau) {
      return niveau;
    }
    throw "Erreur lors de la récupération du niveau";
  }
}
