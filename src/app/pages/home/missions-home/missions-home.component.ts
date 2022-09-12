import { Component, Input } from '@angular/core';
import { Mission } from 'src/app/modeles/mission';

@Component({
  selector: 'app-missions-home',
  templateUrl: './missions-home.component.html',
  styleUrls: ['./missions-home.component.scss']
})
export class MissionsHomeComponent {

  @Input() missions: Mission[] = [];

  constructor() { }

  trackById = (_: number, item: any): string => item.id;

}
