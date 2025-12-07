import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonItem,
  IonImg,
  IonCard,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInput,
    IonInputPasswordToggle,
    IonButton,
    IonItem,
    IonImg,
    IonCard,
    IonIcon,
    RouterLink
  ],
})
export class LoginPage implements OnInit {

  email: string = '';
  senha: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}


  async entrar() {

    if(!this.email || !this.senha) {
      alert('Por favor, preencha email e senha!');
      return;
    }

    try {
      await this.auth.login(this.email, this.senha);
      alert('Login realizado com sucesso!');

      this.router.navigate(['tabs/tabs/tab1']);

    } catch (error : any) {

    alert ('Erro ao fazer Login ' + error.message);
    }
  }
}