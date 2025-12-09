import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

// FIREBASE
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

// COMPONENTES IONIC
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonItem, IonInput, IonButton, IonIcon 
} from '@ionic/angular/standalone';

// ÍCONES
import { addIcons } from 'ionicons';
import { personOutline, mailOutline, lockClosedOutline, checkmarkDoneOutline, personAddOutline, chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonItem, IonInput, IonButton, IonIcon
  ]
})
export class CadastroPage {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  private auth = inject(Auth);
  private router = inject(Router);
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController);

  constructor() {
    addIcons({ personOutline, mailOutline, lockClosedOutline, checkmarkDoneOutline, personAddOutline, chevronBackOutline });
  }

  async cadastrar() {
    // 1. VALIDAÇÕES BÁSICAS
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      this.mostrarMensagem('Preencha todos os campos!', 'warning');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mostrarMensagem('As senhas não conferem!', 'danger');
      return;
    }

    if (this.senha.length < 6) {
      this.mostrarMensagem('A senha deve ter pelo menos 6 caracteres.', 'warning');
      return;
    }

    // 2. INÍCIO DO PROCESSO
    const loading = await this.loadingController.create({ message: 'Criando conta...' });
    await loading.present();

    try {
      // Cria o usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.senha);
      const user = userCredential.user;

      // Salva o Nome do Usuário no perfil do Firebase
      await updateProfile(user, { displayName: this.nome });

      await loading.dismiss();
      this.mostrarMensagem('Conta criada com sucesso!', 'success');

      // Redireciona para o app
      this.router.navigate(['/tabs/tab1']);

    } catch (error: any) {
      await loading.dismiss();
      console.error(error);

      // Tratamento de erros do Firebase
      let msg = 'Erro ao criar conta.';
      if (error.code === 'auth/email-already-in-use') msg = 'Este e-mail já está cadastrado.';
      if (error.code === 'auth/invalid-email') msg = 'E-mail inválido.';
      if (error.code === 'auth/weak-password') msg = 'A senha é muito fraca.';

      this.mostrarMensagem(msg, 'danger');
    }
  }

  async mostrarMensagem(texto: string, cor: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: texto,
      duration: 3000,
      color: cor,
      position: 'bottom',
      icon: cor === 'success' ? 'checkmark-circle' : 'alert-circle'
    });
    await toast.present();
  }
}