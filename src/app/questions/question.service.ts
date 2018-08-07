import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Question } from './question';
import { environment } from '../../environments/environment';


@Injectable()

export class QuestionService {

    urlAssociate: string;
    urlQuestion: string;

    constructor(public http: HttpClient) {
        this.urlAssociate = `${environment.apiUrl}/associate`;
        this.urlQuestion = `${environment.apiUrl}/questions`;
    }

    save(question: Question) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.urlQuestion, question, httpOptions);
    }

    update(question: Question) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.put(`${this.urlQuestion}/${question.id}`, question, httpOptions);
    }

    load(): Observable<any> {
        return this.http.get(this.urlQuestion).map((response: Response) => {
            return response;
        });
    }

    remove(id) {
        return this.http.delete(`${this.urlQuestion}/${id}`);
    }

    saveInAssociateTable(questionId, enviromentTypeId) {
        let relatedIds = {
            questionId: questionId,
            enviromentTypeId: enviromentTypeId
        };

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post(this.urlAssociate, relatedIds, httpOptions);
    }
    
    getAssociatedItems(questionId): Observable<any> {
        return this.http.get(`${this.urlAssociate}/${questionId}`).map((response: Response) => {
            return response;
        });
    }

    removeAssociatedItems(questionId) {
        return this.http.delete(`${this.urlAssociate}/${questionId}`);
    }
}
