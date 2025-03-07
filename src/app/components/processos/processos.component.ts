import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProcessoService } from '../../services/processo.service';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrl: './processos.component.css',
  imports: [FormsModule, RouterLink, CommonModule, RouterModule],
})
export class ProcessosComponent implements OnInit {
  processos: any[] = [];
  processosFiltrados: any[] = [];
  nomeProcurado: string = "";
  tipoProcurado: string = "";
  statusProcurado: string = "";

  constructor(private processoService: ProcessoService, private router: Router, private renderer: Renderer2) { }

ngOnInit(): void {
  this.carregarProcessos();
}

carregarProcessos(): void {
  this.processoService.getProcessos().subscribe((data) => {
    this.processos = data;
    this.processosFiltrados = [...this.processos];
  });
}

procurarProcessos(): void {
  this.processosFiltrados = this.processos.filter((processo) => {
    const achadosPorNome = processo.nome.toLowerCase().includes(this.nomeProcurado.toLowerCase());
    const achadosPorTipo = processo.tipo.toLowerCase().includes(this.tipoProcurado.toLowerCase());
    const achadosPorStatus = this.statusProcurado.toLowerCase() ? processo.tipo === this.statusProcurado : true;
    return achadosPorNome && achadosPorTipo && achadosPorStatus;
  });
}

clearFilters(): void {
  this.nomeProcurado = '';
  this.tipoProcurado = '';
  this.processosFiltrados = [...this.processos];
}


}
