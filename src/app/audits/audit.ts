import { Evaluation } from "./evaluation";

export class Audit {
    id: number;
    title: string;
    units_id: number;
    unit_name: string;
    evaluations: Array<Evaluation>;
    initial_date: Date;
    due_date: Date;
    description: string;
    status: number;

    constructor(title?: string, units_id?: number, evaluations?: Array<Evaluation>, 
        initial_date?: Date, due_date?: Date, description?: string, status: number = 0, id?: number){
        this.id = id;
        this.title = title;
        this.units_id = units_id;
        this.evaluations = evaluations;
        this.initial_date = initial_date;
        this.due_date = due_date;
        this.description = description;
        this.status = status;
    }
}
