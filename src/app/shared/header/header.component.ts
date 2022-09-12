import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() img: string = '';

  constructor() { }

  /**
   * Descendre en bas du header
   */
  scroll(): void {
    // Scroller vers le bas de 100vh
    window.scrollBy(0, window.innerHeight);
  }

}
