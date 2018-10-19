export class Enviroment {
    id: number;
    block: string;
    description: string;
    name: string;
    enviroment_types_id: number;
    units_id: number;
    users_id: number;

    constructor(id?:number, block?: string, description?: string, name?: string, 
                enviroment_types_id?: number, units_id?: number, users_id?: number){
        this.id = id;
        this.block = block;
        this.description = description;
        this.name = name;
        this.enviroment_types_id = enviroment_types_id;
        this.units_id = units_id;
        this.users_id = id;
    }
}
