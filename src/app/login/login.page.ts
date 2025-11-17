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
import { logoGoogle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';

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
    RouterLink,
  ],
})
export class LoginPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
addIcons({ logoGoogle });
