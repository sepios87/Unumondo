import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pedagogy-home',
  templateUrl: './pedagogy-home.component.html',
  styleUrls: ['./pedagogy-home.component.scss']
})
export class PedagogyHomeComponent {

  @Input() descriptionPedagogie? : string;

  constructor() { }

}
