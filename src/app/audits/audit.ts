import { Enviroment } from "../enviroments/enviroment";

export class Audit {
    id: number;
    title: string;
    status: string;
    enviroments_id: number;
    initial_date: Date;
    due_date: Date;
    users_id: number;
    description: string;
    units_id: number;
    Enviroment: Enviroment;
}
