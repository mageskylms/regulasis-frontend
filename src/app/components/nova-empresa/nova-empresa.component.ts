import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-nova-empresa',
  templateUrl: './nova-empresa.component.html',
  styleUrls: ['./nova-empresa.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})

export class NovaEmpresaComponent implements OnInit {
  empresas: any[] = [];
  showDropdown = false;
  empresaForm: FormGroup;

  constructor(
    private empresaService: EmpresaService, 
    private fb: FormBuilder, 
    private router: Router,
    private location: Location
  ) {
    this.empresaForm = this.fb.group({
      nome: ['', Validators.required],
      nomeFantasia: [''],
      cnpj: ['', [
        Validators.required,
        Validators.pattern(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/)
      ]],
      enderecoSede: ['', Validators.required],
      nomeResponsavel: ['', Validators.required],
      contatoResponsavel: [''],
      emailResponsavel: ['', [Validators.required, Validators.email]],
      setor: ['', Validators.required],
      observacoes: [''],
      tipo: ['', Validators.required],
      idEmpresaSede: ['']
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

  toggleDropdown() {
    const tipo = this.empresaForm.get('tipo')?.value;
    this.showDropdown = tipo === 'filial';

    if (this.showDropdown) {
      this.empresaForm.get('selecao')?.enable();
      this.empresaForm.get('selecao')?.setValidators([Validators.required]);
    } else {
      this.empresaForm.get('selecao')?.disable();
      this.empresaForm.get('selecao')?.clearValidators();
    }
    this.empresaForm.get('selecao')?.updateValueAndValidity();
  }


  criarEmpresa() {
    if (this.empresaForm.invalid) {
      console.log(this.empresaForm.errors);
      alert('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    const novaEmpresa = {
      nome: this.empresaForm.value.nome,
      nomeFantasia: this.empresaForm.value.nomeFantasia,
      cnpj: this.empresaForm.value.cnpj,
      enderecoSede: this.empresaForm.value.enderecoSede, // Corrigido
      nomeResponsavel: this.empresaForm.value.nomeResponsavel, // Corrigido
      contatoResponsavel: this.empresaForm.value.contatoResponsavel, // Corrigido
      emailResponsavel: this.empresaForm.value.emailResponsavel, // Corrigido
      setor: this.empresaForm.value.setor,
      observacoes: this.empresaForm.value.observacoes,
      tipo: this.empresaForm.value.tipo,
      idEmpresaSede: this.empresaForm.value.idEmpresaSede
    };

    // Se for filial, adicionamos 'selecao', senão, removemos.
    if (this.empresaForm.value.tipo === 'filial') {
      novaEmpresa.idEmpresaSede = this.empresaForm.value.idEmpresaSede || null;
    }

    console.log("Enviando para API:", novaEmpresa);

    this.empresaService.criarEmpresa(novaEmpresa).subscribe({
      next: () => {
        alert('Empresa cadastrada com sucesso!');
        this.empresaForm.reset();
        this.router.navigate(['/empresas']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar empresa:', err);
        alert(`Ocorreu um erro ao cadastrar a empresa. Tente novamente.`);
      }
    });
  }
}