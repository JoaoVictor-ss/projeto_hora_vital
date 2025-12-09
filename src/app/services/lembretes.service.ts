import { Injectable, signal } from '@angular/core';

export interface Lembrete {
  id: string;
  nome: string;
  horario: string;
  dataInicio: string;
  observacoes: string;
  ativo: boolean; // Campo obrigatório
}

@Injectable({
  providedIn: 'root'
})
export class LembretesService {
  // Inicializa com um dado de exemplo CORRETO (com ativo: true)
  public lembretes = signal<Lembrete[]>([
    { 
      id: '1', 
      nome: 'Dipirona 1G', 
      horario: '08:00', 
      dataInicio: '2024-01-01', 
      observacoes: 'Tomar após comer',
      ativo: true 
    }
  ]);

  constructor() { }

  adicionar(lembrete: Lembrete) {
    this.lembretes.update(values => [...values, lembrete]);
  }

  listar() {
    return this.lembretes();
  }

  toggleAtivo(id: string) {
    this.lembretes.update(items =>
      items.map(item => item.id === id ? { ...item, ativo: !item.ativo } : item)
    );
  }
}