import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  apiUrl: string = '';
  constructor(private _httpClient: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/report`;
   }

  filter(auditId: number): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/${auditId}`)
  }
}