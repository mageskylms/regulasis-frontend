import { Routes } from '@angular/router';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { NovaEmpresaComponent } from './components/nova-empresa/nova-empresa.component';
import { DetalhesEmpresaComponent } from './components/detalhes-empresa/detalhes-empresa.component';

export const routes: Routes = [
  { path: 'empresas', component: EmpresaComponent },
  { path: 'nova-empresa', component: NovaEmpresaComponent },
  { path: 'detalhes-empresa/:id', component: DetalhesEmpresaComponent}, // 🚀 Agora é uma rota independente
  { path: '', redirectTo: '/empresas', pathMatch: 'full' },  // Redirecionar para a página de empresas
  { path: '**', redirectTo: '/empresas' }  // Rota padrão para página não encontrada
];