import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Enviroment } from './enviroment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class EnviromentService implements OnInit {

   url: string;

   constructor(public http: HttpClient) {
       this.url = `${environment.apiUrl}/enviroments`;
   }

    ngOnInit(): void {
        this.load();
    }

    save(enviroment: Enviroment) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        return this.http.post(this.url, enviroment, httpOptions);
    }

    update(enviroment: Enviroment) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        return this.http.put(`${this.url}/${enviroment.id}`, enviroment, httpOptions);
    }

    load(): Observable<Enviroment[]> {
        return this.http.get<Enviroment[]>(this.url);
    }

    remove(id) {
       return this.http.delete(`${this.url}/${id}`);
    }

    loadEnviromentsByUnit(unitId: number) {
       return this.http.get<Enviroment[]>(`${this.url}/${unitId}`);
    }
}
