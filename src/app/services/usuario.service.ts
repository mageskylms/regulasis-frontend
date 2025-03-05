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

  createUser(usuario: any): Observable<any> {
    return this.apiService.post('usuario/', usuario);
  }
  
  updateUser(usuario: any): Observable<any> {
    return this.apiService.post('usuario/', usuario);
  }

  deleteUser(id: number): Observable<any> {
    return this.apiService.delete(`usuario/:id`, id);
  }
}
