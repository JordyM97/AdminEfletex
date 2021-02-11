import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class FirebaseServicioService {

  constructor(
    public firebase: AngularFireAuth,
  ) { }


  async SignUp(email:string, password:string) {
    await this.firebase.createUserWithEmailAndPassword(email, password);
  }

  async sendPasswordResetEmail(email:string) {
    await this.firebase.sendPasswordResetEmail(email);
  }



}
