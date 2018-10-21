export class Unit {
    id: number;
    name: string;
    city: string;
    description: string;
    state: string;

    constructor(id?: number, name?: string, city?: string, description?: string, state?: string){
        this.id = id;
        this.name = name;
        this.city = city;
        this.description = description;
        this.state = state;
    }
}
