import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrl: './editar-empresa.component.css',
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditarEmpresaComponent {

  empresa: any;
  empresas: any[] = [];
  showDropdown = false;
  empresaForm: FormGroup;
  empresaId!: string;

  constructor(
    private empresaService: EmpresaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.empresaForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
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
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.carregarEmpresa(id);
      }
    });
  }

  carregarEmpresa(id: string) {
    this.empresaService.getEmpresaById(id).subscribe(
      (data) => {
        const empresaTransformada = {
          id: data.id,
          nome: data.nome,
          nomeFantasia: data.nome_fantasia,
          cnpj: data.cnpj,
          enderecoSede: data.endereco_sede,
          nomeResponsavel: data.nome_responsavel,
          contatoResponsavel: data.contato_responsavel,
          emailResponsavel: data.email_responsavel,
          setor: data.setor,
          observacoes: data.observacoes,
          tipo: data.tipo,
          idEmpresaSede: data.id_empresa_sede
        };

        this.empresaForm.patchValue(empresaTransformada);
        this.empresa = empresaTransformada;
        this.empresaId = id;

        if (this.empresa.tipo === 'filial') {
          this.showDropdown = true;
        }
      },
      (error) => {
        console.error('Erro ao buscar empresa:', error);
        alert('Erro ao carregar os dados da empresa.');
      }
    );
  }

  toggleDropdown() {
    const tipo = this.empresaForm.get('tipo')?.value;
    this.showDropdown = tipo === 'filial';
  }

  voltar() {
    this.location.back();
  }

  editarEmpresa() {
    if (this.empresaForm.invalid) {
      alert('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    const empresaAtualizada = this.empresaForm.value;

    if (empresaAtualizada && confirm('Tem certeza que deseja editar essa empresa?')) {
      this.empresaService.editarEmpresa(this.empresaId, empresaAtualizada).subscribe({
        next: () => {
          alert('Empresa atualizada com sucesso!');
          this.voltar();
        },
        error: (err) => {
          console.error('Erro ao atualizar empresa:', err);
          alert('Erro ao atualizar empresa. Tente novamente.');
        }
      });
    }
  }

}
