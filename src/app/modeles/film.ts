import { Asset } from './asset';

export class Film {

  constructor(
    public readonly id: string,
    public readonly titre: string,
    public readonly description: string,
    public readonly lienFilm: string,
    public readonly lienTrailer: string,
    public readonly palmares: Asset[],
    public readonly affiche: Asset
  ) { }

  public static fromDirectusData(data: any): Film {
    return new Film(
      data.id,
      data.traductions[0].titre,
      data.traductions[0].description,
      data.lien_film,
      data.lien_trailer,
      data.palmares.map((e: any) => Asset.fromDirectusData(e.directus_files_id)),
      Asset.fromDirectusData(data.affiche),
    );
  }

}
