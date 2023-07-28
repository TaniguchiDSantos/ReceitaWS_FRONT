export class Receita {
    public id: number = 0;
    public cnpj?: string;
    public result?: string;
    public searchTerm: string = '';

    constructor(json?: any){
        if (json){
            this.id = json.id;
        }
    }
}
