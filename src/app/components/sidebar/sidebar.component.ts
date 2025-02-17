import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = false;

  constructor(private renderer: Renderer2) {}

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
