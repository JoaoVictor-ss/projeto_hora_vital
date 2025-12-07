import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
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

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
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
    RouterLink,
  ],
})
export class CadastroPage implements OnInit {
  
  nome = '';
  email = '';
  cpf ='';
  altura = '';
  idade = '';
  peso = '';
  sexo = '';
  doencas = '';
  telefone = '';
  senha = '';
  confirmarSenha = '';

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {}

  async registrar() {
  
    if (
      !this.nome ||
      !this.email ||
      !this.cpf ||
      !this.altura||
      !this.idade ||
      !this.peso ||
      !this.sexo ||
      !this.doencas ||
      !this.telefone ||
      !this.senha ||
      !this.confirmarSenha
    ) {
      alert ('Preencha todos os campos obrigatórios!');
      return;
  }
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!')
      return;
    }

    try {
      await this.auth.register({
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        altura: this.altura,
        idade: this.idade,
        peso: this.peso,
        sexo: this.sexo,
        doencas: this.doencas,
        telefone: this.telefone,
        senha: this.senha,
      });

      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/login']);
    } catch (err: any) {
        console.error('Erro completo Firebase:', err);      // mostra tudo no console
        console.error('Código do erro:', err.code);          // exemplo: auth/invalid-email
        console.error('Mensagem do erro:', err.message);     // exemplo: INVALID_EMAIL

        alert('Erro ao registrar: ' + err.code + ' - ' + err.message);
          
      }
    }
  }
