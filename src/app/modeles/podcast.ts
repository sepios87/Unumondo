import { Asset } from './asset';

export class Podcast {

  constructor(
    public readonly id: string,
    public readonly nom: string,
    public readonly audio: Asset,
    public readonly miniature: Asset,
  ) { }

  public static fromDirectusData(data: any): Podcast {
    return new Podcast(
      data.id,
      data.nom,
      Asset.fromDirectusData(data.audio),
      Asset.fromDirectusData(data.miniature),
    );
  }

}
