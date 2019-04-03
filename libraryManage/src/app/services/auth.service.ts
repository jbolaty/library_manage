import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { reject } from 'q';


// Ici on veut créer 3 méthodes
// - une pour créer un nouvel utilisateur 
// - une pour premettre à un utilisateur de se connecter
// - une pour permettre à l'utilisateur de se connecter 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  // Créer un nouvel utilisateur (asynchrone)
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error)=>{
            reject(error)
          }
        );
      }
    );
  }

  // Conexion de l'utilisateur (asynchrone)
  singnInUser(email: string, password: string){
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error)
          }
        )
      }
    )
  }

  // déconnexion de l'utilisateur 
  sinOutUser(){
    firebase.auth().signOut();
  }

}
