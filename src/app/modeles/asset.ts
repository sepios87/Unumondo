import { directus } from "src/constantes";

export class Asset {

    constructor(
      public readonly id?: string,
      public readonly titre?: string,
      public readonly description?: string,
    ) { }

    public static fromDirectusData(data?: any): Asset {
      return new Asset(
        data?.id ? data.id : (data && data),
        data?.title,
        data?.description
      );
    }

    getUrl = (prereglagle?: string): string => {
        if (!this.id) return "/assets/images/placeholder.webp";
        return (
            `${directus.url}assets/${this.id}${prereglagle ? '?key='+prereglagle : ''}`
        );
    }

  }
