import { Component, OnInit } from '@angular/core';
import { TraductionService, langues } from 'src/app/services/traduction.service';

@Component({
  selector: 'app-langselector',
  templateUrl: './langselector.component.html',
  styleUrls: ['./langselector.component.scss']
})
export class LangselectorComponent implements OnInit {

  langues = langues;
  langueActuelle!: string;

  constructor(private _traductionService: TraductionService) { }

  ngOnInit(): void {
    this.langueActuelle = this._traductionService.langueActuelle;
  }

  /**
   * Change la langue suivant le choix de l'utilisateur
   * @param {langues} langue
   * @param {Event} event
   */
  changeLangue(langue: langues, event: Event): void {
    if (langue !== this.langueActuelle) {
      this._traductionService.setLanguage(langue);
    } else {
      event.preventDefault();
    }
  }

}
