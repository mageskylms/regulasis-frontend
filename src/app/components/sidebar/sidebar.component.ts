import { Component, OnInit, Renderer2,  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule]
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  userName: string = '';

  constructor(private renderer: Renderer2, private authService: AuthService) {}

  ngOnInit() {
    this.userName = localStorage.getItem('user') || 'Usuário';
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;

    const mainContainer = document.querySelector('.main-container');

    if (this.isCollapsed) {
      this.renderer.removeClass(mainContainer, 'menu-open');
      this.renderer.addClass(mainContainer, 'menu-closed');
    } else {
      this.renderer.removeClass(mainContainer, 'menu-closed');
      this.renderer.addClass(mainContainer, 'menu-open');
    }
  }
}
