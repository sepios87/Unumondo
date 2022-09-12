import { Asset } from './asset';

export class Video {

  constructor(
    public readonly id: string,
    public readonly nom: string,
    public readonly lien: string,
    public readonly miniature: Asset,
  ) { }

  public static fromDirectusData(data: any): Video {
    return new Video(
      data.id,
      data.nom,
      data.lien,
      Asset.fromDirectusData(data.miniature),
    );
  }

}
