import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { NovaEmpresaComponent } from './components/nova-empresa/nova-empresa.component';
import { DetalhesEmpresaComponent } from './components/detalhes-empresa/detalhes-empresa.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { EditarEmpresaComponent } from './components/editar-empresa/editar-empresa.component';
import { ProcessosComponent } from './components/processos/processos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' } },
  { path: 'empresas', component: EmpresaComponent, data: { animation: 'EmpresasPage' } },
  { path: 'nova-empresa', component: NovaEmpresaComponent, data: { animation: 'EmpresasPage' } },
  { path: 'detalhes-empresa/:id', component: DetalhesEmpresaComponent, data: { animation: 'EmpresasPage' }}, 
  { path: 'editar-empresa/:id', component: EditarEmpresaComponent, data: { animation: 'EmpresasPage' }}, 
  { path: 'processos', component: ProcessosComponent, data: { animation: 'EmpresasPage' }},
  { path: 'usuarios', component: UsuariosComponent}, 
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}, 
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }