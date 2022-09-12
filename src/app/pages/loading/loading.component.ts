import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  $loadingObservable?: Observable<number>;

  constructor(
    private _loadingService: LoadingService,
    private _titleService: Title,
    private _translate: TranslateService
  ) { }

  async ngOnInit(): Promise<void> {
    this._titleService.setTitle(await firstValueFrom(this._translate.get('title.loading')) + ' - Unu mondo');
    this._loadingService.lanchLoadData();
    this.$loadingObservable = this._loadingService.$loadingObservable;
  }

}
