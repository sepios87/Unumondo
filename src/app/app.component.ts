import { Component, OnInit, HostListener } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  isScrollable: boolean = false;

  constructor(private _loadingService: LoadingService) {}

  @HostListener('window:scroll', ['$event.target']) onScrollEvent(event: any) {
    if (event.scrollingElement.scrollTop > window.innerHeight / 2) {
      this.isScrollable = true;
    } else {
      this.isScrollable = false;
    }
  }

  // Supprimer le click droit
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: Event) {
    event.preventDefault();
  }

  ngOnInit(): void {
    // Afficher la loadingpage pour précharger les données
    this._loadingService.loadData();
  }

  scrollToTop(): void {
    window.scroll(0, 0);
  }

}
