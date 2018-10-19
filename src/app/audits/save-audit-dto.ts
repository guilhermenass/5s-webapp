import { SaveEvaluationDto } from "./save-evaluation-dto";

export class SaveAuditDto {
    id: number;
    title: string;
    units_id: number;
    evaluations: Array<SaveEvaluationDto>;
    initial_date: Date;
    due_date: Date;
    description: string;
    status: number;

    constructor(title: string, units_id: number, evaluations: Array<SaveEvaluationDto>, 
        initial_date: Date, due_date: Date, description: string, status: number = 0, id?: number){
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
