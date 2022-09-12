export class Niveau {

  constructor(
    public readonly id: string,
    public readonly nom: string
  ) {}

  public static fromDirectusData(data: any): Niveau {
    return new Niveau(
      data.id,
      data.traductions[0].nom
    );
  }

}
