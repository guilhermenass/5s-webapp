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
    emailUrl: string;

    constructor(public httpClient: HttpClient) {
        this.url = `${environment.apiUrl}/users`;
        this.emailUrl = `${environment.apiUrl}/email`
    }

    save(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.httpClient.post(this.url, user, httpOptions);
    }

    update(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.httpClient.put(`${this.url}/${user.id}`, user, httpOptions);
    }

    load(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.url);
    }

    loadResponsiblesByUnit(unitId: number): Observable<User[]>{
        return this.httpClient.get<User[]>(`${this.url}/${unitId}`)
    }

    remove(id) {
        return this.httpClient.delete(`${this.url}/${id}`);
    }

    sendEmailNewPassword(id: number, email: string) {
        return this.httpClient.post(`${this.emailUrl}/newPassword`, {email: email, id: id});
    }
}
