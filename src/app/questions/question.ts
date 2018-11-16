export class Question {
    id: number;
    title: string;
    description: string;
    sense: number;

    constructor(id?: number, title?: string, description?: string,  sense?: number){
        this.id = id;
        this.title = title;
        this.description = description;
        this.sense = sense;
    }
}
