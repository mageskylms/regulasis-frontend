import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { jwtDecode } from "jwt-decode";
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey: string = 'token';
  private userName: string = "user";

  constructor(private apiService: ApiService, private usuarioService: UsuarioService) { }

  // Método para login
  login(credentials: any) {
    return this.apiService.post('login', credentials);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserData(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      console.log(decodedToken?.userId);
      return decodedToken?.userId; // Supondo que o token tenha a propriedade "userData"
    }
    return null;
  }

  pegarNomeUsuario(): Observable<{ name: string } | null> {
    const id = this.getUserData();

    if (id) {
      return this.usuarioService.getUserName(id);
    }
    return new Observable(observer => observer.next(null));
  }

  decodeToken(token: string): any {
    try {
        return jwtDecode(token);
    } catch (Error) {
        return null; // Retorna null se o token for inválido
    }
}

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    console.log('Logout chamado. Token antes:', localStorage.getItem(this.tokenKey));
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userName);
  }

}