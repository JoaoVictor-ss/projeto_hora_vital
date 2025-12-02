import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; // Importar Router para voltar após salvar

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class EditarPerfilPage implements OnInit {
  // Objeto simulando os dados atuais do usuário
  // Na vida real, esses dados viriam do seu banco de dados ou serviço
  usuario = {
    nome: 'Fulaninho da Silva Souza',
    altura: 1.75,
    peso: 80,
    idade: 25,
    sexo: 'masculino',
    doencas: 'Nenhuma',
    email: 'fulaninho@email.com',
    telefone: '11999999999',
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  salvarPerfil() {
    console.log('Dados salvos:', this.usuario);
    // Aqui você colocaria a lógica para enviar ao backend (Firebase, API, etc.)

    // Simula uma mensagem de sucesso e volta para a tela anterior
    alert('Perfil atualizado com sucesso!');
    this.router.navigate(['/tabs/perfil']); // Ajuste a rota conforme seu app
  }
}
