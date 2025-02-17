import { EmpresaService } from './../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalhes-empresa',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './detalhes-empresa.component.html',
  styleUrl: './detalhes-empresa.component.css'
})
export class DetalhesEmpresaComponent implements OnInit {

  empresa: any;
  empresaSede: any;

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

  getEmpresaDetails(id: string): void {
    this.empresaService.getEmpresaById(id).subscribe(
      (data) => {
        this.empresa = data; 
        if (this.empresa.tipo === 'filial' && this.empresa.id_empresa_sede) {
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

  excluirEmpresa(): void {
    if (this.empresa && confirm('Tem certeza que deseja excluir essa empresa?')) {
      this.empresaService.excluirEmpresa(this.empresa.id).subscribe(
        () => {
          alert('Empresa excluída com sucesso');
          this.router.navigate(['/empresas']);
        },
        (error) => {
          console.error('Erro ao excluir a empresa:', error);
        }
      );
    }
  }

   // Alteração do método para usar o Location
   voltarParaEmpresas() {
    this.location.back(); // Volta para a última página visitada
  }

}
