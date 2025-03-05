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
  companies: any[] = [];
  filteredCompanies: any[] = [];
  searchName: string = '';
  searchCnpj: string = '';
  selectedSector: string = '';

  constructor(private empresaService: EmpresaService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadCompanies();
  }


  loadCompanies(): void {
    this.empresaService.getEmpresas().subscribe((data) => {
      this.companies = data;
      this.filteredCompanies = [...this.companies];  // Inicialmente, mostra todas as empresas
    });
  }

  searchCompanies(): void {
    this.filteredCompanies = this.companies.filter((company) => {
      const matchesName = company.nome.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesCnpj = company.cnpj.includes(this.searchCnpj);
      const matchesSector = this.selectedSector.toLowerCase() ? company.setor === this.selectedSector : true;
      return matchesName && matchesSector && matchesCnpj;
    });
  }

  clearFilters(): void {
    this.searchName = '';
    this.selectedSector = '';
    this.filteredCompanies = [...this.companies];  // Resetar os filtros
  }

  deleteCompany(id: number): void {
    // Confirmação antes de excluir
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      this.empresaService.excluirEmpresa(id).subscribe(
        () => {
          alert('Empresa excluída com sucesso!');
          
          // Remove a empresa da lista localmente (para evitar recarregar a página)
          this.companies = this.companies.filter(company => company.id !== id);
          this.filteredCompanies = this.filteredCompanies.filter(company => company.id !== id);
          
          // Redireciona para a lista de empresas
          this.router.navigate(['/empresas']);
        },
        (error: unknown) => {
          if (error instanceof Error) {
            console.error('Erro ao excluir a empresa:', error.message);
          } else {
            console.error('Erro desconhecido ao excluir a empresa:', error);
          }
          alert('Erro ao excluir empresa. Tente novamente.');
        }
      );
    }
  }
}