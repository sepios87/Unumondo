import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-who',
  templateUrl: './who.component.html',
  styleUrls: ['./who.component.scss']
})
export class WhoComponent {

  @Input() descriptionAssociation?: string;

  constructor(
    private _modalService: ModalService,
  ) { }

  openModalContribuer(): void {
    this._modalService.openContribuer();
  }

}
