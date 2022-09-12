import { Asset } from 'src/app/modeles/asset';

export class Association {

  constructor(
    public readonly descriptionAssociation: string,
    public readonly descriptionContribuer: string,
    public readonly descriptionPedagogie: string,
    public readonly mail: string,
    public readonly chiffresId: number[],
    public readonly plaquettePedagogie?: Asset,
    public readonly facebook?: string,
    public readonly twitter?: string,
    public readonly instagram?: string,
    public readonly linkedin?: string,
    public readonly linktree?: string,
    public readonly youtube?: string
  ) { }

  public static fromDirectusData(data: any): Association {
    return new Association(
      data.traductions[0]?.description_association,
      data.traductions[0]?.description_contribuer,
      data.traductions[0]?.description_pedagogie,
      data.mail,
      data.chiffres,
      // Comme la plaquette est optionnelle, il ne faut pas faire un asset qui mettra un placeholder
      data.traductions[0]?.plaquette_pedagogie && Asset.fromDirectusData(data.traductions[0]?.plaquette_pedagogie),
      data.facebook,
      data.twitter,
      data.instagram,
      data.linkedin,
      data.linktree,
      data.youtube
    )
  }

}
