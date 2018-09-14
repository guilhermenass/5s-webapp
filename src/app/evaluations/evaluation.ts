import { Enviroment } from "../enviroments/enviroment";
import { User } from "../users/user";
import { Unit } from "../units/unit";

export class Evaluation {
    id: number;
    enviroments: Enviroment[];
    users: User[];
    units: Unit[];
    enviroments_id: string[];
}
