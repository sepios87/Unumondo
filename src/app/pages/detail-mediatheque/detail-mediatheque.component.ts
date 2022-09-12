import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/modeles/video';
import { Asset } from 'src/app/modeles/asset';
import { SwiperItem } from 'src/app/modeles/swiperItem';
import { Podcast } from 'src/app/modeles/podcast';
import { MediathequeService } from '../../services/mediatheque.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-mediatheque',
  templateUrl: './detail-mediatheque.component.html',
  styleUrls: ['./detail-mediatheque.component.scss']
})
export class DetailMediathequeComponent implements OnInit {

  collectionName: string = '';
  selectedItem?: string;
  videos: SwiperItem[] = [];
  podcasts: SwiperItem[] = [];
  photos: Asset[] = [];

  constructor(
    private route: ActivatedRoute,
    private _mediathequeService: MediathequeService,
    private _titleService: Title,
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    await this._getCollectionByExpeditionId(id!);
    this._titleService.setTitle(this.collectionName + ' - Unumondo');
  }

  selectImage(url: string) {
    this.selectedItem = url;
    document.body.classList.add("stop-scrolling");
  }

  closeSelectedImage() {
    this.selectedItem = undefined;
    document.body.classList.remove("stop-scrolling");
  }

  private async _getCollectionByExpeditionId(id: string) {
    const collection = await this._mediathequeService.getCollectionById(id);
    if (collection) {
      this.collectionName = collection.nom;
      this.photos = collection.photos ?? [];
      this.videos = collection.videos?.map((v: Video) => new SwiperItem(v.id, v.miniature, v.nom ?? '', 'Vidéo', v.lien)) ?? [];
      this.podcasts = collection.podcasts?.map((p: Podcast) => new SwiperItem(p.id ?? '', p.miniature, p.nom, 'Podcast', p.audio.getUrl())) ?? [];
    }
  }

}
