import { Asset } from './asset';

export class FicheVideo {

  constructor(
    public readonly id: string,
    public readonly nom: string,
    public readonly lien: string,
    public readonly duree: number,
    public readonly miniature: Asset,
    public readonly niveauId: string
  ) { }

  public static fromDirectusData(data: any): FicheVideo {
    return new FicheVideo(
      data.id,
      data.traductions[0]?.nom,
      data.traductions[0]?.lien,
      data.traductions[0]?.duree,
      Asset.fromDirectusData(data.miniature),
      data.niveau
    );
  }
}
