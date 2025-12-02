import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para recursos básicos
import { FormsModule } from '@angular/forms'; // OBRIGATÓRIO para usar [(ngModel)]
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
  IonInput,
  IonButton,
  IonCheckbox,
  IonTextarea,
  AlertController, // Importado para mostrar msg de sucesso
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  // Adicionei CommonModule, FormsModule e IonTextarea na lista abaixo
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
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
    IonInput,
    IonButton,
    IonCheckbox,
    IonTextarea,
  ],
})
export class Tab2Page {
  // Objeto que vai guardar as informações do formulário
  novoLembrete = {
    nomeRemedio: '',
    horario: '',
    dataInicio: '',
    observacao: '',
  };

  constructor(private alertController: AlertController) {
    addIcons({ addCircleOutline });
  }

  async salvarLembrete() {
    // 1. Verifica se preencheu pelo menos o nome (validação básica)
    if (!this.novoLembrete.nomeRemedio) {
      const alertErro = await this.alertController.create({
        header: 'Atenção',
        message: 'Por favor, digite o nome do remédio.',
        buttons: ['OK'],
      });
      await alertErro.present();
      return;
    }

    // 2. Aqui você vê os dados prontos no Console do navegador
    console.log('Dados para salvar:', this.novoLembrete);

    // 3. Mostra mensagem de sucesso
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Lembrete salvo com sucesso.',
      buttons: ['OK'],
    });
    await alert.present();

    // 4. Limpa o formulário após salvar
    this.novoLembrete = {
      nomeRemedio: '',
      horario: '',
      dataInicio: '',
      observacao: '',
    };
  }
}
