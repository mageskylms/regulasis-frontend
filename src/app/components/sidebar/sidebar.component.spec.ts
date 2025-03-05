import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Renderer2 } from '@angular/core';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserData', 'logout']);
    rendererSpy = jasmine.createSpyObj('Renderer2', ['removeClass', 'addClass']);

    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [CommonModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Renderer2, useValue: rendererSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userName on ngOnInit', () => {
    const mockUser = { name: 'Test User' };
    authServiceSpy.getUserData.and.returnValue(mockUser);
    component.ngOnInit();
    expect(component.userName).toBe('Test User');
  });

  it('should not set userName if getUserData returns null', () => {
    authServiceSpy.getUserData.and.returnValue(null);
    component.ngOnInit();
    expect(component.userName).toBe('');
  });

  it('should call authService.logout and reload window on logout', () => {
    spyOn(window.location, 'reload');
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should toggle isCollapsed and update main-container classes', () => {
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main-container');
    document.body.appendChild(mainContainer);

    component.toggleSidebar();
    expect(component.isCollapsed).toBe(true);
    expect(rendererSpy.removeClass).toHaveBeenCalledWith(mainContainer, 'menu-open');
    expect(rendererSpy.addClass).toHaveBeenCalledWith(mainContainer, 'menu-closed');

    component.toggleSidebar();
    expect(component.isCollapsed).toBe(false);
    expect(rendererSpy.removeClass).toHaveBeenCalledWith(mainContainer, 'menu-closed');
    expect(rendererSpy.addClass).toHaveBeenCalledWith(mainContainer, 'menu-open');

    document.body.removeChild(mainContainer);
  });
});