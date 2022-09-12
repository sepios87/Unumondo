import { Component, OnInit } from '@angular/core';
import { ExpeditionService } from 'src/app/services/expedition.service';
import { Expedition } from 'src/app/modeles/expedition';
import { Meta, Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { MediathequeService } from "../../services/mediatheque.service";
import { SwiperItem } from "../../modeles/swiperItem";

@Component({
  selector: 'app-mediatheque',
  templateUrl: './mediatheque.component.html',
  styleUrls: ['./mediatheque.component.scss']
})
export class MediathequeComponent implements OnInit {

  expeditions: Expedition[] = [];
  collections: SwiperItem[] = [];

  constructor(
    private _expeditionService: ExpeditionService,
    private _mediathequeService: MediathequeService,
    private _titleService: Title,
    private _translate: TranslateService,
    private _metaService: Meta
  ) { }

  async ngOnInit(): Promise<void> {
    this._titleService.setTitle(await firstValueFrom(this._translate.get('title.gallery')) + ' - Unu mondo');
    this._metaService.addTags([
      {
        name: 'description',
        content: await firstValueFrom(this._translate.get('description.gallery'))
      },
    ]);
    await this._getExpeditions();
    await this._getCollections();
  }

  private async _getExpeditions(): Promise<void> {
    this.expeditions = await this._expeditionService.getExpeditions();
  }

  async _getCollections(): Promise<void> {
    this._mediathequeService.getCollections().then(collections =>
      this.collections = collections.map(e => new SwiperItem(e.id, e.miniature, e.nom, 'Collection'))
    );
  }
}
