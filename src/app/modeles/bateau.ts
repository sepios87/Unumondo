export class Bateau {

  constructor(
    public readonly descriptionCerclePolaire: string,
    public readonly nom: string,
    public readonly longueur?: number,
    public readonly largeur?: number,
    public readonly tirantEau?: number,
    public readonly capacite?: number,
    public readonly port?: string,
    public readonly dateConstruction?: Date
  ) {

  }

  public static fromDirectusData(data: any): Bateau {
    return new Bateau(
      data.traductions[0]?.description_cercle_polaire,
      data.nom,
      data.longueur,
      data.largeur,
      data.capacite,
      data.tirant_eau,
      data.port,
      data.date_construction
    )
  }

}
