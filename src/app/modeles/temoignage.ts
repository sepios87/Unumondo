import { Asset } from './asset';

export class Temoignage {

  constructor(
    public readonly id: string,
    public readonly nom: number,
    public readonly prenom: number,
    public readonly photo: Asset,
    public readonly contenu: string,
    public readonly expeditionId: string
  ) { }

  public static fromDirectusData(data: any): Temoignage {
    return new Temoignage(
      data.id,
      data.nom,
      data.prenom,
      Asset.fromDirectusData(data.photo),
      data.traductions[0]?.contenu,
      data.expedition
    );
  }

}
