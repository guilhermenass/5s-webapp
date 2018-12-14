import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EvaluationService {
    
    url: string;

   constructor(public http: HttpClient) {
       this.url = `${environment.apiUrl}/evaluations`;
    }

   save(evaluation) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.post(this.url, evaluation);
    }

    remove(id) {
       return this.http.delete(`${this.url}/${id}`);
    }
}
