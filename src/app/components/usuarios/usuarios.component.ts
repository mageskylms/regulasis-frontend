import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  isEditing = false;
  userForm: FormGroup;
  userId!: string;

  constructor(private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.userForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      contato: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      regra: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadUsers();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.carregarUsuario(id);
      }
    });
  }

  // Carregar lista de usuários
  loadUsers(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;

    });
  }

  carregarUsuario(id: string) {
    this.usuarioService.getUserById(id).subscribe((data) => {
      const usuarioSelecionado = {
        id: data.id
      };

      this.userId = id;
    })
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.userForm.reset(); // Reseta todos os campos
  }

  // Criar novo usuário
  createUser(): void {
    this.usuarioService.createUser(this.userForm).subscribe(() => {
      this.loadUsers();
    });
  }

  // Editar usuário
  editUser(user: any): void {

    this.isEditing = true;
    this.userForm.patchValue(user);

    this.userId = user.id;
  }

  // Atualizar usuário
  updateUser(): void {

    if (this.userForm.invalid) {
      alert('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    const userAtualizado = this.userForm.value;

    if (userAtualizado && confirm('Tem certeza que deseja atalizar esse usuário?')) {
      this.usuarioService.updateUser(this.userId, userAtualizado).subscribe({
        next: () => {
          alert("Usuário atualizado com sucesso!");
          this.loadUsers();
        },
        error: (err) => {
          console.error('Erro ao atualizar empresa:', err);
          alert('Erro ao atualizar empresa. Tente novamente.');
        }
      });
    }

    this.loadUsers();
  }

  // Excluir usuário
  deleteUser(id: number): void {
    this.usuarioService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

}
