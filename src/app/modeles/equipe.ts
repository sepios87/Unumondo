export class Equipe {
    
    constructor(
        public readonly id: string,
        public readonly nom: string,
    ) { }

    public static fromDirectusData(data: any): Equipe {
        return new Equipe(
            data.id,
            data.traductions[0]?.nom,
        );
    }

}