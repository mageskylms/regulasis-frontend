import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  imports: [CommonModule, RouterModule, FormsModule ]
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  isEditing = false;
  userForm = { id: null, name: '', email: '', role: '', password: "" };

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Carregar lista de usuários
  loadUsers(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  // Criar novo usuário
  createUser(): void {
    this.usuarioService.createUser(this.userForm).subscribe(() => {
      this.loadUsers();
      this.resetForm();
    });
  }

  // Editar usuário
  editUser(user: any): void {
    this.isEditing = true;
    this.userForm = { ...user };
  }

  // Atualizar usuário
  updateUser(): void {
    this.usuarioService.updateUser(this.userForm).subscribe(() => {
      this.loadUsers();
      this.resetForm();
    });
  }

  // Excluir usuário
  deleteUser(id: number): void {
    this.usuarioService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  // Resetar formulário
  resetForm(): void {
    this.userForm = { id: null, name: '', email: '', role: '', password: "" };
    this.isEditing = false;
  }
}
