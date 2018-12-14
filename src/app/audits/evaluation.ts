import { Enviroment } from "../enviroments/enviroment";
import { User } from "../users/user";

export class Evaluation {
    id: number;
    Enviroment: Enviroment;
    User: User;
    status: number;
    
    constructor(enviroment: Enviroment, user: User, id?: number, status?:number){
        this.id = id;
        this.Enviroment = enviroment;
        this.User = user;

    }
}
