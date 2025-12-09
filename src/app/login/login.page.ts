import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

// Imports do Firebase
import { Auth, signInWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';

import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonItem, IonInput, IonButton, IonIcon, IonText 
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, medkit } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonContent, IonHeader, IonTitle, IonToolbar, 
    IonItem, IonInput, IonButton, IonIcon, IonText
  ]
})
export class LoginPage {
  email = '';
  senha = '';

  private router = inject(Router);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController); // Para mostrar "Carregando..."
  
  // Injetando o Auth do Firebase
  private auth = inject(Auth);

  constructor() {
    addIcons({ mailOutline, lockClosedOutline, medkit });
  }

  async fazerLogin() {
    if (!this.email || !this.senha) {
      this.mostrarMensagem('Preencha email e senha!', 'warning');
      return;
    }

    // Mostra um loading enquanto o Firebase processa
    const loading = await this.loadingController.create({ message: 'Entrando...' });
    await loading.present();

    try {
      // --- O COMANDO MÁGICO DO FIREBASE ---
      const usuario = await signInWithEmailAndPassword(this.auth, this.email, this.senha);
      
      console.log('Login Sucesso:', usuario.user.uid);
      await loading.dismiss();
      
      this.router.navigate(['/tabs/tab1']);

    } catch (error: any) {
      await loading.dismiss();
      console.error(error);
      
      // Tratamento de erros comuns em Português
      let mensagem = 'Erro ao fazer login.';
      if (error.code === 'auth/invalid-credential') mensagem = 'E-mail ou senha incorretos.';
      if (error.code === 'auth/user-not-found') mensagem = 'Usuário não encontrado.';
      if (error.code === 'auth/wrong-password') mensagem = 'Senha incorreta.';
      
      this.mostrarMensagem(mensagem, 'danger');
    }
  }

  async recuperarSenha() {
    const alert = await this.alertController.create({
      header: 'Recuperar Senha',
      subHeader: 'Informe seu e-mail para receber o link',
      inputs: [ { name: 'email', type: 'email', placeholder: 'exemplo@email.com' } ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Enviar',
          handler: async (data) => {
            if (!data.email) return false;
            
            try {
              // Envia o email real pelo Firebase
              await sendPasswordResetEmail(this.auth, data.email);
              this.mostrarMensagem('Verifique seu e-mail!', 'success');
              return true;
            } catch (err) {
              this.mostrarMensagem('Erro ao enviar e-mail.', 'danger');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarMensagem(texto: string, cor: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: texto,
      duration: 3000,
      color: cor,
      position: 'bottom'
    });
    await toast.present();
  }
}