import { Injectable} from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Audit } from './audit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SaveAuditDto } from './save-audit-dto';

@Injectable()

export class AuditService {
    
    url: string;

   constructor(public http: HttpClient) {
       this.url = `${environment.apiUrl}/audits`;
    }

   save(audit: SaveAuditDto) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
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

    remove(id) {
       return this.http.delete(`${this.url}/${id}`);
    }
}
