import { Asset } from './asset';

export class Mission {

  constructor(
    public readonly id: string,
    public readonly nom: string,
    public readonly description: string,
    public readonly image: Asset
  ) {}

  public static fromDirectusData(data: any): Mission {
    return new Mission(
      data.id,
      data.traductions[0]?.nom,
      data.traductions[0]?.description,
      Asset.fromDirectusData(data.image),
    );
  }

}
