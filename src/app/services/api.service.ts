import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  get(endpoint: string): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get(url);
  }

  post(endpoint: string, data: any): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post(url, data);
  }

  delete(endpoint: string, id: number): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}/${id}`;
    return this.http.delete(url);
  }

}