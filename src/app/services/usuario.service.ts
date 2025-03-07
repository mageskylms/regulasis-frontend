import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apiService: ApiService) { }

  getUsuarios(): Observable<any[]> {
    return this.apiService.get('usuarios');
  }

  getUserName(userId: number): Observable<{name: string}> {
    return this.apiService.get(`usuarios/${userId}`);
  }

  getUserById(id: string): Observable<any> {
    return this.apiService.get(`usuarios/${id}`);
  }

  createUser(usuario: any): Observable<any> {
    return this.apiService.post('usuarios/', usuario);
  }
  
  updateUser(id: string, usuario: any): Observable<any> {
    return this.apiService.put(`usuarios/${id}`, usuario);
  }

  deleteUser(id: number): Observable<any> {
    return this.apiService.delete(`usuarios/`, id);
  }
}
