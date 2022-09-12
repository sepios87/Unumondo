import { Asset } from './asset';

export class Sponsor {

  constructor(
    public readonly id: string,
    public readonly nom: string,
    public readonly logo: Asset,
    public readonly estMisEnAvant: boolean,
    public readonly estMecene: boolean,
    public readonly categorieId?: string,
    public readonly lien?: string,
  ) { }

  public static fromDirectusData(data: any): Sponsor {
    return new Sponsor(
      data.id,
      data.nom,
      Asset.fromDirectusData(data.logo),
      data.mettre_en_avant ?? false,
      data.mecene ?? false,
      data.categorie,
      data.lien,
    );
  }

}
