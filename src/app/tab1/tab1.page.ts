import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LembretesService, Lembrete } from '../services/lembretes.service';
import { AlertController } from '@ionic/angular'; 

// Importando componentes visuais do Ionic
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonButton, IonButtons, IonIcon, IonLabel, IonItem, IonThumbnail,
  IonText
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { notifications, notificationsOff, calendar, stopCircleOutline, add, timeOutline, bedOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonButton, IonButtons, IonIcon, IonLabel, IonItem, IonThumbnail,
    IonText
  ],
})
export class Tab1Page {
  public lembretesService = inject(LembretesService);
  private alertController = inject(AlertController);

  alarmeTocando = false;
  audio = new Audio('assets/sounds/alarm.mp3');
  ultimoHorarioTocado = ''; 

  constructor() {
    addIcons({ notifications, notificationsOff, calendar, stopCircleOutline, add, timeOutline, bedOutline });
    this.iniciarVerificacao();
  }

  // --- FUNÇÃO QUE ESTAVA FALTANDO ---
  // O seu HTML chama isso para desbloquear o som no celular
  habilitarAudio() {
    this.audio.play().then(() => {
        this.audio.pause();
        this.audio.currentTime = 0;
    }).catch(e => console.log("Áudio aguardando interação..."));
  }

  // --- CONTROLE DE ALARME ---

  async tocarAlarmeReal(nomeRemedio: string) {
    this.audio.currentTime = 0;
    this.audio.loop = true; // Garante loop
    try {
      await this.audio.play();
      this.alarmeTocando = true;
    } catch (err) {
      console.warn("Som bloqueado. Exibindo alerta.");
      const alert = await this.alertController.create({
        header: '⏰ HORA DO REMÉDIO!',
        subHeader: nomeRemedio,
        message: 'Toque em OK para confirmar.',
        buttons: [{ text: 'OK', handler: () => this.desligarAlarme() }]
      });
      await alert.present();
    }
  }

  desligarAlarme() {
    console.log("Desligando alarme...");
    this.alarmeTocando = false;
    this.audio.loop = false; // Trava o loop
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  toggleAlarm(lembrete: Lembrete) {
    if (!lembrete.id) return;

    // REGRA 1: Se estiver tocando, O PRIMEIRO CLIQUE SEMPRE PARA O SOM
    if (this.alarmeTocando) {
        this.desligarAlarme();
        // Se você quiser que o clique APENAS pare o som (e mantenha o alarme ligado para amanhã), 
        // descomente a linha abaixo 'return':
        // return; 
    }

    // REGRA 2: Alterna o status (Ativo/Inativo)
    this.lembretesService.toggleAtivo(lembrete.id);

    // REGRA 3: Som de feedback (só se não estava gritando antes)
    const item = this.lembretesService.listar().find(l => l.id === lembrete.id);
    
    if (item?.ativo && !this.alarmeTocando) {
        // Toca um 'bip' rápido para confirmar ativação
        this.audio.currentTime = 0;
        this.audio.play().catch(() => {});
        setTimeout(() => { 
            if (!this.alarmeTocando) this.audio.pause(); 
        }, 500);
    } else if (!item?.ativo) {
        this.desligarAlarme();
    }
  }

  iniciarVerificacao() {
    window.setInterval(() => {
      const agora = new Date();
      const horaAtual = agora.toTimeString().slice(0, 5); 

      if (this.ultimoHorarioTocado === horaAtual) return;

      const lista = this.lembretesService.listar();

      for (const item of lista) {
        if (item.ativo && item.horario === horaAtual) {
            this.ultimoHorarioTocado = horaAtual;
            console.log(`🔔 HORA DO REMÉDIO: ${item.nome}`);
            this.tocarAlarmeReal(item.nome || 'Remédio'); 
            break; 
        }
      }
    }, 1000);
  }
}