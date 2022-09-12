import { Asset } from './asset';

export class Presse {

  constructor(
    public readonly id: string,
    public readonly titre: string,
    public readonly image: Asset,
    public readonly date: Date,
    public readonly journal: string,
    public readonly lien?: string,
  ) { }

  public static fromDirectusData(data: any): Presse {
    return new Presse(
      data.id,
      data.titre_article,
      Asset.fromDirectusData(data.image_article),
      new Date(data.date),
      data.journal,
      data.lien,
    );
  }

}
