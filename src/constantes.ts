import { Directus } from "@directus/sdk";
import { environment } from './environments/environment.prod';

export const directus: Directus<any> = new Directus<any>(environment.directusUrl, {
    auth: {
        staticToken: environment.staticToken
    }
});

export const montants: Array<number> = [20, 50, 100, 200];