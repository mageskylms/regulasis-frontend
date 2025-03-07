import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  constructor(private apiService: ApiService) { }

  getEmpresas(): Observable<any[]> {
    return this.apiService.get('empresas'); // Chama o método genérico GET do ApiService
  }

  getEmpresaById(id: string): Observable<any> {
    return this.apiService.get(`empresas/${id}`);
  }

  editarEmpresa(id: string, empresa: any): Observable<any> {
    return this.apiService.put(`empresas/${id}`, empresa);
  }

  criarEmpresa(empresa: any): Observable<any> {
    return this.apiService.post('empresas', empresa); // Chama o método genérico POST do ApiService
  }

  // Método para excluir uma empresa
  excluirEmpresa(id: number): Observable<any> {
    return this.apiService.delete(`empresas`, id);
  }

}