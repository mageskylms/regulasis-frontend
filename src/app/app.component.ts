import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports:
    [CommonModule,
      LoginComponent,
      SidebarComponent,
      RouterOutlet,
    ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0 }), animate('500ms ease-in', style({ opacity: 1 }))])
    ]),
    trigger('pageTransition', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('250ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  isLoggedIn: boolean = false;
  showLoading: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // Verifica se há token para liberar o sistema

    // Simula um tempo de carregamento (ajustado para funcionar apenas quando necessário)
    if (this.isLoggedIn) {
      this.showLoading = false; // Se já estiver logado, não mostra o loading
      this.router.navigate(['/dashboard']); // Vai direto para a tela principal
    } else {
      // Se não estiver logado, exibe o loading por 1,5 segundo
      setTimeout(() => {
        this.showLoading = false;
      }, 1500);
    }
  }

  handleLoginSuccess() {
    this.isLoggedIn = true;
    this.showLoading = true; // Inicia o loading após o login
    // Exibe a tela de loading por 1 segundo para dar tempo de transição
    setTimeout(() => {
      this.router.navigate(['/dashboard']); // Redireciona para a tela principal
      this.showLoading = false; // Fecha o loading após o redirecionamento
    }, 1000);
  }

  getRouteAnimation(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
