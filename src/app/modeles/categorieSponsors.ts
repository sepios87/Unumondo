export class CategorieSponsors {
  
    constructor(
      public readonly id: string,
      public readonly nom: string,
    ) { }
  
    public static fromDirectusData(data: any): CategorieSponsors {
      return new CategorieSponsors(
        data.id,
        data.traductions[0]?.nom,
      )
    }
  
  }
  