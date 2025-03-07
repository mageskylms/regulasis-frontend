import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  constructor(private apiService: ApiService) { }

  getProcessos(): Observable<any[]> {
    return this.apiService.get('processos');
  }

  getProcessoById(id: string): Observable<any> {
    return this.apiService.get(`processos/${id}`);
  }

  editarProcesso(id: string, empresa: any): Observable<any> {
    return this.apiService.put(`processos/${id}`, empresa);
  }

  criarProcesso(empresa: any): Observable<any> {
    return this.apiService.post('processos', empresa);
  }

  // Método para excluir uma empresa
  excluirProcesso(id: number): Observable<any> {
    return this.apiService.delete(`processos`, id);
  }



}
