import { Component, OnInit } from '@angular/core';
import { Expedition } from 'src/app/modeles/expedition';
import { ExpeditionService } from 'src/app/services/expedition.service';
import { Meta, Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss']
})
export class ExpeditionsComponent implements OnInit {

  expeditions: Expedition[] = [];

  private _currentDate: Date = new Date();

  constructor(
    private expeditionService: ExpeditionService,
    private _titleService: Title,
    private _metaService: Meta,
    private _translate: TranslateService
  ) { }

  ngOnInit() {
    this._setTitle();
    this._getExpeditions();
  }

  private async _setTitle() {
    this._titleService.setTitle(await firstValueFrom(this._translate.get('title.expeditions')) + ' - Unu mondo');
    this._metaService.addTags([
      {
        name: 'description',
        content: await firstValueFrom(this._translate.get('description.expeditions'))
      },
      {
        name: 'robots',
        content: 'index, follow'
      }
    ]);
  }

  private _getExpeditions(): void {
    this.expeditionService.getExpeditions().then(expeditions => this.expeditions = expeditions);
  }

  isAfter(date: Date): boolean {
    return date > this._currentDate;
  }

  getTimeDifference(date: Date): { delai: number; label: string; }[] {
    const years = date.getFullYear() - this._currentDate.getFullYear();
    const months = (date.getMonth()+1) - (this._currentDate.getMonth()+1) + years * 12;
    const days = date.getDate() - this._currentDate.getDate();

    const tab = [];
    if (months > 0) tab.push({ delai: months, label: months === 1 ?  'month' : 'months'});
    if (days > 0) tab.push({ delai: days, label: days === 1 ? 'day' : 'days' });
    return tab;
  }

  trackById = (_: number, item: any): string => item.id;

}
