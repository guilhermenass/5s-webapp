export class SaveEvaluationDto {
    id: number;
    environments_id: number;
    users_id: number;
    
    constructor(id:number = null, environments_id: number, users_id: number){
        this.id = id;
        this.environments_id = environments_id;
        this.users_id = users_id;
    }
}
