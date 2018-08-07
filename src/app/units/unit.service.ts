import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Unit } from './unit';
import { environment } from '../../environments/environment';

@Injectable()

export class UnitService {

    url: string;
    constructor(public http: HttpClient) {
        this.url = `${environment.apiUrl}/units`;
    }

    save(unit: Unit) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.url, unit, httpOptions);
    }

    update(unit: Unit) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.put(`${this.url}/${unit.id}`, unit, httpOptions);
    }

    load(): Observable<any> {
        return this.http.get(this.url).map((response: Response) => {
            return response;
        });
    }

    remove(id) {
        return this.http.delete(`${this.url}/${id}`);
    }

    getStates() {
        return this.http.get('https://br-cidade-estado-nodejs.glitch.me/estados/');
    }

    getCities(stateId) {
        return this.http.get(`https://br-cidade-estado-nodejs.glitch.me/estados/${stateId}/cidades?`);
    }

    getUnitByEnviromentType(questionId) {
        return this.http.get<Unit>(`${this.url}/${questionId}`);
    }
}
