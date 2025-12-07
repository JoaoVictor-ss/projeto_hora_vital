import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonIcon,
  IonLabel,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
import { onAuthStateChanged, User } from '@angular/fire/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonIcon,
    IonLabel,
    IonItem,
    IonButton,
    RouterLink,
  ],
})
export class PerfilPage implements OnInit {
  userData: any = null;


  constructor(private authService: AuthService) {}

  ngOnInit() {
    onAuthStateChanged(this.authService['auth'], async (user: User | null) => {
      if (user) {
        this.userData = await this.authService.getUserData(user.uid);
      }
    });
  }
}