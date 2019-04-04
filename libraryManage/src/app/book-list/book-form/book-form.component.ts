// Formulaire pour remplir les informations du livres

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    this.booksService.createNewBook(newBook);

    this.router.navigate(['/books']);

  }

}
