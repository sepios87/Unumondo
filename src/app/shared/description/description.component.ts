import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {

  @Input() title: string = '';
  @Input() desc: string = '';
  @Input() image: string = '';
  @Input() direction: 'left' | 'right' = 'right';

  constructor() { }

}
