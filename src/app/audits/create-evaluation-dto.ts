export class CreateEvaluationDto {
    environments_id: number;
    users_id: number;
    
    constructor(environments_id: number, users_id: number){
        this.environments_id = environments_id;
        this.users_id = users_id;
    }
}
