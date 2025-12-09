import { Component, inject } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LembretesService, Lembrete } from '../services/lembretes.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
// Novos ícones para o layout bonito
import { addCircleOutline, medkitOutline, alarmOutline, calendarOutline, documentTextOutline, saveOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab2Page {
  private lembretesService = inject(LembretesService);
  private alertController = inject(AlertController);
  private router = inject(Router);

  novoLembrete: Lembrete = {
    id: '', nome: '', horario: '', dataInicio: '', observacoes: '', ativo: true 
  };

  constructor() {
    // Registrando os ícones novos
    addIcons({ addCircleOutline, medkitOutline, alarmOutline, calendarOutline, documentTextOutline, saveOutline });
  }

  async salvarLembrete() {
    if (!this.novoLembrete.nome || !this.novoLembrete.horario) {
      const erroAlert = await this.alertController.create({
        header: 'Ops!',
        subHeader: 'Faltam dados',
        message: 'Por favor, diga o nome do remédio e o horário.',
        buttons: ['Corrigir']
      });
      await erroAlert.present();
      return;
    }

    this.novoLembrete.id = Date.now().toString();
    this.novoLembrete.ativo = true;
    this.lembretesService.adicionar({ ...this.novoLembrete });

    const successAlert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Lembrete criado com sucesso.',
      buttons: ['OK']
    });

    await successAlert.present();
    await successAlert.onDidDismiss();
    
    this.router.navigate(['/tabs/tab1']);
    this.limparFormulario();
  }

  limparFormulario() {
    this.novoLembrete = { id: '', nome: '', horario: '', dataInicio: '', observacoes: '', ativo: true };
  }
}