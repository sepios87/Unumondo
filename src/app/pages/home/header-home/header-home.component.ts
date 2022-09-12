import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { Expedition } from 'src/app/modeles/expedition';
import { ExpeditionService } from 'src/app/services/expedition.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {

  expeditions: Expedition[] = [];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    navSpeed: 2000,
    items: 1,
  }

  constructor(
    private _expeditionService: ExpeditionService,
  ) { }


  ngOnInit(): void {
    this._getExpeditions();
  }

  private _getExpeditions(): void {
    this._expeditionService.getExpeditions().then(expeditions => this.expeditions = expeditions);
  }

  scroll(): void {
    window.scrollBy(0, window.innerHeight);
  }

  trackById = (_: number, item: any): string => item.id;

}
