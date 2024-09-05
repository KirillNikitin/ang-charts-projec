import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  constructor(private _http: HttpClient) { }

  addChart(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/charts', data);
  }

  getCharts(): Observable<any> {
    return this._http.get('http://localhost:3000/charts');
  }

  updateChart(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/charts/${id}`, data);
  }

  deleteChart(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/charts/${id}`);
  }
}
