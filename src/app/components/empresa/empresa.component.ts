import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  imports: [FormsModule, RouterLink, CommonModule, RouterModule],
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  empresas: any[] = [];
  empresasFiltradas: any[] = [];
  searchName: string = '';
  searchCnpj: string = '';
  selectedTipo: string = '';

  constructor(private empresaService: EmpresaService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.carregaEmpresas();
  }


  carregaEmpresas(): void {
    this.empresaService.getEmpresas().subscribe((data) => {
      this.empresas = data.filter((empresa: any) => empresa.tipo === 'sede');
      this.empresasFiltradas = [...this.empresas];  
    });
  }

  searchCompanies(): void {
    this.empresasFiltradas = this.empresas.filter((empresa) => {
      const matchesName = empresa.nome.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesCnpj = empresa.cnpj.includes(this.searchCnpj);
      const matchesTipo = this.selectedTipo.toLowerCase() ? empresa.tipo === this.selectedTipo : true;
      return matchesName && matchesTipo && matchesCnpj;
    });
  }

  clearFilters(): void {
    this.searchName = '';
    this.selectedTipo = '';
    this.empresasFiltradas = [...this.empresas];  // Resetar os filtros
  }

}