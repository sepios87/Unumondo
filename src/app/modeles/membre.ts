import { Asset } from './asset';

export class Membre {

  constructor(
    public readonly id: string,
    public readonly nom: string,
    public readonly prenom: string,
    public readonly photo: Asset,
    public readonly equipeId: string,
    public readonly fonctionsId: string[],
    public readonly estBenevole: boolean,
    public readonly facebook?: string,
    public readonly twitter?: string,
    public readonly instagram?: string,
    public readonly linkedin?: string,
    public readonly youtube?: string,
    public readonly siteWeb?: string
  ) { }

  public static fromDirectusData(data: any): Membre {
    return new Membre(
      data.id,
      data.nom,
      data.prenom,
      Asset.fromDirectusData(data.photo),
      data.equipe,
      data.fonctions,
      data.benevole,
      data.facebook,
      data.twitter,
      data.instagram,
      data.linkedin,
      data.youtube,
      data.site_web
    );
  }

  isWithoutSocialsNetworks(): boolean {
    return !(!this.youtube && !this.facebook && !this.instagram && !this.linkedin && !this.twitter && !this.siteWeb);
  }

}
