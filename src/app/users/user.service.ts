import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from './user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class UserService {

    url: string;
    utilUrl: string;

    constructor(public http: HttpClient) {
        this.url = `${environment.apiUrl}/users`;
    }

    save(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.url, user, httpOptions);
    }

    update(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.put(`${this.url}/${user.id}`, user, httpOptions);
    }

    load(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }

    remove(id) {
        return this.http.delete(`${this.url}/${id}`);
    }
}
