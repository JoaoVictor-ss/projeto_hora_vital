import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para *ngFor e *ngIf
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, 
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonList, IonThumbnail, IonIcon, IonButton, AlertController 
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { timeOutline, calendar, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  // Adicionei CommonModule e IonButton aqui nos imports
  imports: [
    CommonModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, 
    ExploreContainerComponent, IonItem, IonLabel, 
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, 
    IonList, IonThumbnail, IonIcon, IonButton
  ],
})
export class Tab3Page {

  // Dados baseados na sua imagem
  historico = [
    {
      titulo: 'Gripe Comum',
      medicamentos: [
        {
          nome: 'Dipirona 1G',
          horarios: '00:00 • 06:00 • 12:00 • 18:00',
          inicio: '30/09/2025',
          fim: '04/10/2025',
          imagem: '../../assets/icon/horavital.png',
          obs: null
        },
        {
          nome: 'Neopiridin',
          horarios: '00:00 • 06:00 • 12:00 • 18:00',
          inicio: '30/09/2025',
          fim: '04/10/2025',
          imagem: '../../assets/icon/horavital.png',
          obs: 'Melhora em 5 dias'
        }
      ]
    },
    {
      titulo: 'Anti Concepcional',
      medicamentos: [
        {
          nome: 'Cerazzete',
          horarios: '22 horas',
          inicio: '24/10/2024',
          fim: '01/10/2025',
          imagem: '../../assets/icon/horavital.png',
          obs: 'Troca de remédio'
        }
      ]
    }
  ];

  // Injetamos o AlertController para criar o popup
  constructor(private alertController: AlertController) {
    addIcons({ timeOutline, calendar, trashOutline });
  }

  // Função para abrir o alerta de confirmação
  async confirmarRemocao(grupoIndex: number, remedioIndex: number) {
    const alert = await this.alertController.create({
      header: 'Remover',
      message: 'Deseja remover este medicamento do histórico?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'confirm',
          handler: () => {
            this.removerItem(grupoIndex, remedioIndex);
          },
        },
      ],
    });

    await alert.present();
  }

  // Lógica para apagar o item da lista
  removerItem(grupoIndex: number, remedioIndex: number) {
    this.historico[grupoIndex].medicamentos.splice(remedioIndex, 1);

    // Se o grupo ficar vazio, remove o grupo (opcional)
    if (this.historico[grupoIndex].medicamentos.length === 0) {
      this.historico.splice(grupoIndex, 1);
    }
  }
}