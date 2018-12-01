import { Evaluation } from "./evaluation";
import { Unit } from "../units/unit";

export class Audit {
    id: number;
    title: string;
    unit: Unit;
    unit_id: number;
    evaluations: Array<Evaluation>;
    initial_date: Date;
    due_date: Date;
    description: string;
    status: number;
    status_name: string;

    constructor(title?: string, unit?: Unit, evaluations?: Array<Evaluation>, 
        initial_date?: Date, due_date?: Date, description?: string, status: number = 0, id?: number){
        this.id = id;
        this.title = title;
        this.unit = unit;
        this.initial_date = initial_date;
        if(unit){
            this.unit_id = unit.id;
        }
        this.evaluations = evaluations;
        this.due_date = due_date;
        this.description = description;
        this.status = status;
        
        if(status == 2){
            this.status_name = 'Concluída';
        } else if(new Date() < new Date(due_date)) {
            this.status_name = 'Pendente';
        } else {
            this.status_name = 'Atrasada';
        }
    }
}
