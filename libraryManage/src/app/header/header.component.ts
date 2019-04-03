import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      // Si firebase retourne un user alors this.isAuth = true 
      (user)=>{
        if(user){
          this.isAuth = true;
        } else {
          this.isAuth = false;
      }
    });
  }

  onSignOut(){
    this.authService.sinOutUser();
  }

}
