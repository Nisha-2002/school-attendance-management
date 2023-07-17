import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(startDate: Date, endDate: Date): Observable<Date[]> {
    const apiUrl = `http://example.com/api/endpoint?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`;
    return this.http.get<Date[]>(apiUrl);
  }
}
