export class Chiffre {

  constructor(
    public readonly nom: string,
    public readonly valeur: number,
    public readonly associationId?: string,
    public readonly expeditionId?: string,
  ) { }

  public static fromDirectusData(data: any): Chiffre {
    return new Chiffre(
      data.traductions[0]?.nom,
      data.valeur,
      data.association,
      data.expedition
    )
  }

}
