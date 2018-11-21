import { Injectable} from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SaveAuditDto } from './save-audit-dto';
import { Audit } from './audit';

@Injectable()

export class AuditService {
    
    url: string;
    emailUrl: string;

   constructor(public http: HttpClient) {
       this.url = `${environment.apiUrl}/audits`;
       this.emailUrl = `${environment.apiUrl}/email`;
    }

    save(audit: SaveAuditDto) {
        return this.http.post(this.url, audit);
    }

    update(audit: SaveAuditDto) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.put(`${this.url}/${audit.id}`, audit, httpOptions);
    }

    load(): Observable<any> {
        return this.http.get(this.url).map((response: Response) => {
            return response;
        });
    }

    loadAuditsToReport(): Observable<Audit[]> {
        return this.http.get<Audit[]>(`${this.url}/report`).map((response: Audit[]) => {
            return response;
        })
    }

    loadAuditsByUnit(unitId): Observable<Audit[]> {
        return this.http.get<Audit[]>(`${this.url}/${unitId}`)
    }

    remove(id) {
       return this.http.delete(`${this.url}/${id}`);
    }

    sendEmail(emails: Array<string>) {
        return this.http.post(`${this.emailUrl}/schedule`, emails)
    }
}
