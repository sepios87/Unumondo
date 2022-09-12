import { Asset } from './asset';

export class SwiperItem {

    constructor(
        public id: string,
        public asset: Asset,
        public title: string,
        public subtitle: string,
        public link?: string,
    ) { }
   
}