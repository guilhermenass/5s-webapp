export class SaveEvaluationDto {
    id: number;
    audits_id: number;
    environments_id: number;
    users_id: number;
    
    constructor(id:number, audits_id: number, environments_id: number, users_id: number){
        this.id = id;
        this.audits_id = audits_id;
        this.environments_id = environments_id;
        this.users_id = users_id;
    }
}
