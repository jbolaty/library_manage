// Formulaire pour remplir les informations du livres

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgControlStatus } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/models.ts/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})

export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
    private booksService: BooksService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }


    // OnSaveBook va prendre les informations du formulaire, en créer un nouveau livre,
    // l'ajouter etnavigue vers /books 
  onSaveBook(){
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;

    const newBook = new Book(title, author);
      // on va vérifier si il y a une photo sur la page
      // si l'URL existe et n'est pas vide alors ...
      if(this.fileUrl && this.fileUrl !== ''){
        newBook.photo = this.fileUrl; 
      }
    this.booksService.createNewBook(newBook);

    this.router.navigate(['/books']);

  }

    // méthode qui est appellée quand un fichier est entrain de charger et qui va mettre a jour le
    // DOM au fur et à mesure 
  onUploadFile(file: File){
    console.log('=============' + file)
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  // lorsqu'un evenement sera lancer dans le DOM (ex: (change) ) le onUploadFile sera déclenché
  // avec le file de l'input 
  detectFiles(event){
    this.onUploadFile(event.target.files[0]);
  }

}
