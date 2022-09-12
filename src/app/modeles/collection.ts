import { Asset } from "./asset";
import { Video } from "./video";
import { Podcast } from './podcast';

export class Collection {

  constructor(
    public readonly id: string,
    public readonly nom: string,
    public readonly miniature: Asset,
    public readonly photos?: Asset[],
    public readonly podcasts?: Podcast[],
    public readonly videos?: Video[],
  ) {
  }

  public static fromDirectusData(data: any): Collection {
    return new Collection(
      data.id,
      data.nom,
      new Asset(data.miniature),
      data.photos && data.photos.map((p: any) => new Asset(p.directus_files_id)),
      data.podcasts && data.podcasts.map((p: any) => Podcast.fromDirectusData(p.podcasts_id)),
      data.videos && data.videos.map((v: any) => Video.fromDirectusData(v.videos_id))
    );
  }

}
