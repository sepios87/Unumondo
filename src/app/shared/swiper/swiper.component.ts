import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { SwiperItem } from 'src/app/modeles/swiperItem';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent {

  @Input() list: SwiperItem[] = [];
  @Input() isVideo: boolean = false;
  @Input() isAudio: boolean = false;
  @Input() isContain: boolean = false;
  @Input() routerLink?: string;
  @Output() clickItem = new EventEmitter<string>();

  customOptions: OwlOptions = {
    loop: this.list.length > 1,
    dots: false,
    margin: 50,
    autoWidth: true,
    merge: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3,
      }
    }
  }

  constructor(private _router: Router) { }

  onClickItem(item: SwiperItem): void {
    if (item.link && !this.isAudio) {
      window.open(item.link, '_blank');
    }
    if (this.routerLink) {
      this._router.navigate([this.routerLink, item.id]);
    }
    this.clickItem.emit(item.id);
  }

  trackById = (_: number, item: any): string => item.id;

}
