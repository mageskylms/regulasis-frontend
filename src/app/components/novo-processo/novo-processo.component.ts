import { EmpresaService } from './../../services/empresa.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ProcessoService } from '../../services/processo.service';

@Component({
  selector: 'app-novo-processo',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './novo-processo.component.html',
  styleUrl: './novo-processo.component.css'
})
export class NovoProcessoComponent implements OnInit {

  empresas: any[] = [];
  processoForm: FormGroup;
  processos: any[] = [];

  constructor(
    private empresaService: EmpresaService,
    private processoService: ProcessoService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {
    this.processoForm = this.fb.group({
      nome: ["", Validators.required],
      tipo: ["", Validators.required],
      descricao: ["", Validators.required],
      status: ["", Validators.required],
      data_inicio: ["", Validators.required],
      data_prazo: ["", Validators.required],
      id_empresa: ["", Validators.required],
      id_usuario: ["", Validators.required],
    });
  }


  ngOnInit() {
    this.empresaService.getEmpresas().subscribe(empresas => {
      this.empresas = empresas;
    });
  }

  voltar() {
    this.location.back();
  }

  criarProcesso() {
    if (this.processoForm.invalid) {
      console.log(this.processoForm.errors);
      console.log(this.processoForm.value.status);
      
      alert('Preencha todos os campos obrigatórios corretamente.');
      // return;
    }

    const novoProcesso = {
      nome: this.processoForm.value.nome,
      tipo: this.processoForm.value.tipo,
      descricao: this.processoForm.value.descricao,
      status: this.processoForm.value.status, // Corrigido
      dataInicio: this.processoForm.value.data_inicio, // Corrigido
      dataPrazo: this.processoForm.value.data_prazo, // Corrigido
      idEmpresa: this.processoForm.value.id_empresa, // Corrigido
      idUsuario: this.processoForm.value.id_usuario,
    };

    this.processoService.criarProcesso(novoProcesso).subscribe({
      next: () => {
        alert('Processo cadastrado com sucesso!');
        this.processoForm.reset();
        this.router.navigate(['/processos']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar processo:', err);
        alert(`Ocorreu um erro ao cadastrar a processo. Tente novamente.`);
      }
    });
  }
}
