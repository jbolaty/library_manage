import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

// authGuard est Asynchrone 

@Injectable({
  providedIn: 'root'
})


export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise (
        (resolve, reject)=>{
          firebase.auth().onAuthStateChanged(
            (user)=>{
              if(user){
                resolve(true);
              } else {
                this.router.navigate(['/auth','signin']);
                resolve(false); // pour dire qu'il n'a pas le droit d'accéder
              }
            }
          );
        }
      );
    }
}
