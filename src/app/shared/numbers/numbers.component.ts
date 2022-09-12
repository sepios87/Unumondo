import { Component, Input } from '@angular/core';
import { Chiffre } from 'src/app/modeles/chiffre';
import { CountUpOptions } from 'countup.js';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.scss']
})
export class NumbersComponent {

  @Input() numbers: Chiffre[] = [];
  @Input() imgUrl: string = '';

  options: CountUpOptions = {
    useGrouping: false,
    duration: 9,
  };

  constructor() { }

}
