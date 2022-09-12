import { Asset } from './asset';

export class ExpeditionBateau {

  constructor(
    public readonly id: string,
    public readonly contenu: string,
    public readonly image: Asset
    ) { }

  public static fromDirectusData(data: any): ExpeditionBateau {
    return new ExpeditionBateau(
      data.id,
      data.traductions[0]?.contenu,
      Asset.fromDirectusData(data.image),
    );
  }
}
