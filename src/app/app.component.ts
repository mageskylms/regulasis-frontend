import { Component, Renderer2, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Define a classe inicial para que o layout já esteja correto ao carregar
    const mainContainer = document.querySelector('.main-container');
    this.renderer.addClass(mainContainer, 'menu-open'); // Assume que o menu começa aberto
  }
}
