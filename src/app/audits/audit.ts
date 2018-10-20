import { Evaluation } from "./evaluation";
import { Unit } from "../units/unit";

export class Audit {
    id: number;
    title: string;
    unit: Unit;
    evaluations: Array<Evaluation>;
    initial_date: Date;
    due_date: Date;
    description: string;
    status: number;

    constructor(title?: string, unit?: Unit, evaluations?: Array<Evaluation>, 
        initial_date?: Date, due_date?: Date, description?: string, status: number = 0, id?: number){
        this.id = id;
        this.title = title;
        this.unit = unit;
        this.evaluations = evaluations;
        this.initial_date = initial_date;
        this.due_date = due_date;
        this.description = description;
        this.status = status;
    }
}
