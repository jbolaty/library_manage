import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }
   

  ngOnInit() {
    this.initForm();
  }

  // Méthode qui initialise le formulaire 
  // on créer deux champs, l'un avec le format "email" requis et l'autre  avec expression régulière
  // imposant un minimum de 6 caractères de 0 à 9, a à z miniscule et majuscule
  initForm(){
    this.signUpForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    );
  }

  onSubmit(){
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;

    this.authService.createNewUser(email, password).then(
      ()=>{
        this.router.navigate(['/books']); // si pas d'erreur, redirection vers '/books' 
      },
      (error) => {
        this.errorMessage = error; // affichage du message d'erreur dans le template
      }
    )
  }

}
