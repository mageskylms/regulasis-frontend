import { EmpresaService } from './../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalhes-empresa',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './detalhes-empresa.component.html',
  styleUrl: './detalhes-empresa.component.css'
})
export class DetalhesEmpresaComponent implements OnInit {

  empresa: any;
  empresaSede: any;
  companies: any[] = [];
  filteredCompanies: any[] = [];
  searchName: string = '';
  searchCnpj: string = '';
  selectedSector: string = '';

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location  // Injete o Location aqui
  ) { }


  ngOnInit(): void {
    // Observando as mudanças nos parâmetros da URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getEmpresaDetails(id);
      }
    });

  }

  loadCompanies(): void {
    this.companies = [];
    this.empresaService.getEmpresas().subscribe((data) => {
      this.companies = data;
      this.filteredCompanies = this.companies.filter(company =>
        company.id_empresa_sede === this.empresa.id);
    });
  }

  getEmpresaDetails(id: string): void {
    this.empresaService.getEmpresaById(id).subscribe(
      (data) => {
        this.empresa = data;

        if (this.empresa.tipo === 'sede') {
          this.loadCompanies();
        } else if (this.empresa.tipo === 'filial' && this.empresa.id_empresa_sede) {
          this.getEmpresaSedeDetails(this.empresa.id_empresa_sede);
        }
      },
      (error) => {
        console.error('Erro ao buscar dados da empresa:', error);
      }
    );
  }

  getEmpresaSedeDetails(idSede: string): void {
    this.empresaService.getEmpresaById(idSede).subscribe(
      (data) => {
        this.empresaSede = data;

      },
      (error) => {
        console.error('Erro ao buscar dados da empresa sede:', error);
      }
    );
  }


  editarEmpresa(): void {
    if (this.empresa) {
      this.router.navigate(['/editar-empresa', this.empresa.id]);
    }
  }

  novaFilial(): void {
    if (this.empresa) {
      const empresaId = this.empresa.id; // já carregado no detalhe
      this.router.navigate([`/empresas/${empresaId}/nova-filial`]);
    }
  }

  excluirEmpresa(): void {
    if (this.empresa && confirm('Tem certeza que deseja excluir essa empresa?')) {
      this.empresaService.excluirEmpresa(this.empresa.id).subscribe(
        () => {
          alert('Empresa excluída com sucesso');
          this.router.navigate(['/empresas']);
        },
        (error) => {
          alert('Erro ao excluir a empresa');
          console.error('Erro ao excluir a empresa:', error);
        }
      );
    }
  }

  searchCompanies(): void {
    this.filteredCompanies = this.companies.filter((company) => {
      const matchesName = company.nome.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesCnpj = company.cnpj.includes(this.searchCnpj);
      const matchesSector = this.selectedSector.toLowerCase() ? company.setor === this.selectedSector : true;
      const matchesSede = company.id_empresa_sede === this.empresa.id;  // Adicionando o filtro da sede
      return matchesName && matchesSector && matchesCnpj && matchesSede;
    });
  }


  clearFilters(): void {
    this.searchName = '';
    this.selectedSector = '';
    this.searchCompanies();
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

  // Alteração do método para usar o Location
  voltar() {
    this.location.back(); // Volta para a última página visitada
  }

}