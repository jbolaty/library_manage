import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'libraryManage';

  constructor() {
    var config = {
      apiKey: "AIzaSyDmHniykn6j_RgJzMCSCkVmgf18YbJwF9c",
      authDomain: "librarymanage-d8a9a.firebaseapp.com",
      databaseURL: "https://librarymanage-d8a9a.firebaseio.com",
      projectId: "librarymanage-d8a9a",
      storageBucket: "librarymanage-d8a9a.appspot.com",
      messagingSenderId: "1055885159066"
    };
    firebase.initializeApp(config);
  }
}
