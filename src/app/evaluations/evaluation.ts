import { Enviroment } from "../enviroments/enviroment";

export class Evaluation {
    id: number;
    title: string;
    status: string;
    enviroments_id: number;
    createDate: Date;
    dueDate: Date;
    users_id: number;
    description: string;
    units_id: number;
    Enviroment: Enviroment;
}
