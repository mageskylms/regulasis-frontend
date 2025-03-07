import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<void>();
  loginForm: FormGroup;
  loading: boolean = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.loginSuccess.emit();
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.error = 'Preencha todos os campos!';
      return;
    }

    this.loading = true;
    const { user, password } = this.loginForm.value;

    this.apiService.post('login', { user, password }).subscribe({
      next: (response: { token: string, userName: string }) => {
        
        if (response.token) {
          console.log(response.userName);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', response.userName);
          localStorage.setItem('user', user);
          this.loginSuccess.emit();
        } else {
          this.error = 'Token não recebido. Tente novamente.';
        }
        this.loading = false;
      },
      error: (err: { error: { message: string; }; }) => {
        this.error = err.error?.message || 'Erro ao realizar login.';
        this.loading = false;
      }
    });
  }
}
