import { Asset } from './asset';

export class Expedition {
  constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly nom: string,
    public readonly imageSlider: Asset,
    public readonly images: Asset[],
    public readonly descriptions: string[],
    public readonly carte: Asset,
    public readonly chiffresId?: string[],
    public readonly membresId?: string[],
  ) { }

  public static fromDirectusData(data: any): Expedition {
    return new Expedition(
      data.id,
      new Date(data.date),
      data.traductions[0]?.nom,
      Asset.fromDirectusData(data.image_slider),
      [data.image1, data.image2, data.image3, data.image4].map(i => Asset.fromDirectusData(i)),
      [data.traductions[0]?.description_1, data.traductions[0]?.description_2, data.traductions[0]?.description_3, data.traductions[0]?.description_4],
      Asset.fromDirectusData(data.carte),
      data.chiffres,
      data.membres && data.membres.map((e: any) => e.membres_id),
    );
  }

}
