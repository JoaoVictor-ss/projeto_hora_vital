import { Component } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonThumbnail,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { addIcons } from 'ionicons';
import {
  timeOutline,
  calendar,
  notifications,
  notificationsOff,
} from 'ionicons/icons';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonList,
    IonThumbnail,
    IonIcon,
    IonButton,
    RouterLink,
    ExploreContainerComponent,
  ],
})
export class Tab1Page {

  alarms: any = {
    dipirona: false,
    neopiridin: false,
    alexa: false,
  };

  horarios: any = {
    dipirona: '14:00',
    neopiridin: '16:00',
    alexa: '20:00',
  };

  alarmeTocando = false;

  audio = new Audio('assets/sounds/alarm.mp3');

  constructor() {
    addIcons({
      timeOutline,
      calendar,
      notifications,
      notificationsOff,
    });

    this.verificarAlarme();
  }

  // 🔓 NECESSÁRIO PARA DESBLOQUEAR ÁUDIO
  habilitarAudio() {
    this.audio.play()
      .then(() => {
        this.audio.pause();
        this.audio.currentTime = 0;
        console.log('Áudio liberado.');
      })
      .catch((err) => console.log('Erro ao liberar áudio:', err));
  }

  // 🔔 LIGA/DESLIGA — sem tocar imediatamente
  toggleAlarm(key: string) {
  this.alarms[key] = !this.alarms[key];

  if (this.alarms[key]) {
    // 👉 Toca só pra avisar que o alarme foi ligado
    this.audio.currentTime = 0;
    this.audio.play();
    this.alarmeTocando = true;

    // 👉 Depois de 2 segundos, para pra ficar pronto para tocar no horário
    setTimeout(() => {
      this.desligarAlarme();
    }, 2000);

  } else {
    this.desligarAlarme();
  }
}


  // ⛔ BOTÃO "PARAR"
  desligarAlarme() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.alarmeTocando = false;
  }

  // ✏️ EDITAR HORÁRIO
  editarHorario(medicamento: string) {
    console.log("Editar horário de:", medicamento);
  }

  // 🔍 VERIFICA A CADA 1 SEGUNDO
  verificarAlarme() {
    setInterval(() => {
      const agora = new Date();
      const horaAtual = agora.toTimeString().slice(0, 5); // "HH:MM"

      for (const key in this.alarms) {
        if (this.alarms[key] && this.horarios[key] === horaAtual) {
          if (!this.alarmeTocando) {
            this.audio.currentTime = 0;
            this.audio.play();
            this.alarmeTocando = true;
            console.log(`🔔 Tocando alarme de ${key}`);
          }
        }
      }
    }, 1000);
  }

}
