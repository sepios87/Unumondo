import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isOpen: boolean = false;

  constructor(private _modalService: ModalService) { }

  /**
   * Change l'état d'ouverture du menu
   */
  toggleNav(isOpen: boolean = !this.isOpen): void {
    this.isOpen = isOpen;
  }

  /**
   * Ouvrir la modale de contribution
   */
  openModalContribuer(): void {
    this._modalService.openContribuer();
  }

}
