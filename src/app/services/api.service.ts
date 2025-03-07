import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3000/api';
  private _authService!: AuthService;

  constructor(private http: HttpClient, private injector: Injector) {}

  private get authService(): AuthService {
    if (!this._authService) {
      this._authService = this.injector.get(AuthService);
    }
    return this._authService;
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() });
  }

  getbyId(endpoint: string, id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}/${id}`, { headers: this.getHeaders() });
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, { headers: this.getHeaders() });
  }

  put(endpoint: string, data: any,): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data, { headers: this.getHeaders() });
  }

  delete(endpoint: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}`, { headers: this.getHeaders() });
  }
}
