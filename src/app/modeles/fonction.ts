export class Fonction {
  
    constructor(
      public readonly id: string,
      public readonly nom: string,
    ) { }
  
    public static fromDirectusData(data: any): Fonction {
      return new Fonction(
        data.id,
        data.traductions[0].nom,
      );
    }
  
  }