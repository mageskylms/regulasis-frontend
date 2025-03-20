import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-nova-filial',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
  templateUrl: './nova-filial.component.html',
  styleUrl: './nova-filial.component.css'
})
export class NovaFilialComponent {
  empresaPrincipal: any;
  empresa: any;
  empresas: any[] = [];
  showDropdown = false;
  empresaForm: FormGroup;

  constructor(
    private empresaService: EmpresaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.empresaForm = this.fb.group({
      nome: ['', Validators.required,],
      nomeFantasia: [''],
      unidade: ["", Validators.required,],
      cnpj: ['', [
        Validators.required,
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
    this.carregarEmpresa();
  }

  carregarEmpresa() {
    const id = this.route.snapshot.paramMap.get('empresaId') || "";
    if (id) {
      this.getEmpresaDetails(id);
    }


  }

  getEmpresaDetails(id: string): void {
    this.empresaService.getEmpresaById(id).subscribe(
      (data) => {
        this.empresa = data;
        console.log(this.empresa);
        this.carregaEmpresaNoForm();
      },
      (error) => {
        console.error('Erro ao buscar dados da empresa:', error);
        alert('Erro ao buscar dados da empresa:');
      }
    );
  }

  carregaEmpresaNoForm() {
    setTimeout(() => {
      this.empresaForm.patchValue({
        idEmpresaSede: this.empresa.id,
        nome: this.empresa.nome,
        nomeFantasia: this.empresa.nome_fantasia,
        setor: this.empresa.setor,
        tipo: 'filial'
      });
    }, 1000);
  }

  voltar() {
    this.location.back();
  }

  campoInvalido(campo: string): boolean {
    const controle = this.empresaForm.get(campo);
    return !!(controle && controle.invalid && (controle.dirty || controle.touched));
  }

  criarFilial() {

    const novaFilial = {
      nome: this.empresaForm.value.nome,
      nomeFantasia: this.empresaForm.value.nomeFantasia,
      cnpj: this.empresaForm.value.cnpj,
      enderecoSede: this.empresaForm.value.enderecoSede,
      nomeResponsavel: this.empresaForm.value.nomeResponsavel,
      contatoResponsavel: this.empresaForm.value.contatoResponsavel,
      emailResponsavel: this.empresaForm.value.emailResponsavel,
      setor: this.empresaForm.value.setor,
      observacoes: this.empresaForm.value.observacoes,
      tipo: this.empresaForm.value.tipo,
      idEmpresaSede: this.empresaForm.value.idEmpresaSede,
    };

    console.log("Enviando para API:", novaFilial);

    this.empresaService.criarEmpresa(novaFilial).subscribe({
      next: () => {
        alert('Empresa cadastrada com sucesso!');
        this.empresaForm.reset();
        this.voltar();
      },
      error: (err) => {
        console.error('Erro ao cadastrar empresa:', err);
        alert(`Ocorreu um erro ao cadastrar a empresa. Tente novamente.`);
      }
    });
  }
}
