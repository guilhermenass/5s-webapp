export class Evaluation {
    id: number;
    environment_id: number;
    environment_name: string;
    user_id: number;
    user_name: string;
    
    constructor(environment_id: number, environment_name: string, user_id: number, user_name: string, id?: number){
        this.id = id;
        this.environment_id = environment_id;
        this.environment_name = environment_name;
        this.user_id = user_id;
        this.user_name = user_name;

    }
}
