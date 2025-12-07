import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';

import { Firestore,
  doc,
  setDoc,
  getDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  async register(userData: any) {


    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.senha
    );

    const uid = userCredential.user.uid;

    delete userData.senha;

    await setDoc(doc(this.firestore, 'users', uid), {
      ...userData,
      uid,
      createdAt: new Date(),
    });

    return userCredential;
  }

  login(email: string, senha: string) {
    return signInWithEmailAndPassword(this.auth, email, senha);
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  async getUserData(uid: string) {
    const docRef = doc(this.firestore, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }
}