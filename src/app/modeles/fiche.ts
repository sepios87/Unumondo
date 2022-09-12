import { Asset } from './asset';

export class Fiche {

  constructor(
    public readonly id: string,
    public readonly nom: string,
    public readonly document: Asset,
    public readonly niveauId: string,
    public readonly vignette: Asset
  ) { }

  public static fromDirectusData(data: any): Fiche {
    return new Fiche(
      data.id,
      data.traductions[0]?.nom,
      Asset.fromDirectusData(data.traductions[0]?.fiche_document),
      data.niveau,
      Asset.fromDirectusData(data.vignette),
    );
  }

}
