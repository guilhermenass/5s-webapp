import { CreateEvaluationDto } from "./create-evaluation-dto";

export class CreateAuditDto {
    title: string;
    status: string;
    initial_date: Date;
    due_date: Date;
    description: string;
    units_id: number;
    evaluations: Array<CreateEvaluationDto>;
}
