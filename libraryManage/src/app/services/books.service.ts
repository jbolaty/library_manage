import { Injectable } from '@angular/core';
import { Book } from '../models.ts/book.model';
import { Subject} from 'rxjs/Subject';
import * as firebase from 'firebase';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})


export class BooksService {

  books: Book[] = []; 
  booksSubject = new Subject<Book[]>() //subject qui emettra l'array books 

  constructor() { }

  // fonciton qui recupère le contenu de l'array books et qui le retourne au travers du subject 
  emitBooks(){
    this.booksSubject.next(this.books) // next force to make a new value 
  }

  // Methode pour enregistrer les livres dans la base de donnée
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
    // .set: pour dire si il y a deja quelque chose d'enregistrer à /books,
    // il sera remplacé par this.books (equivalent de la méthode PUT)
  }
  
  getbooks(){
    firebase.database().ref('/books')
      .on('value', (data)=>
      {
        this.books = data.val() ? data.val():[];
        this.emitBooks()
      }
      )
    //.on pour reagir a des modifications de la base de données 
  }

    getSingleBook(id: number){
      return new Promise(
        (resolve, reject)=>{
          firebase.database().ref('/books/' + id).once('value').then(
            (data)=>{
              resolve(data.val());
            }, (error) => {
              reject(error);
            }
          );
        }
      );
      //.once pour récupérer les données une fois
    }

    createNewBook(newBook: Book){
      this.books.push(newBook);
      this.saveBooks();
      this.emitBooks()
    }

      removeBook(book: Book){
        const bookIndexToRemove = this.books.findIndex(
          (bookEl)=>{
            if(bookEl === book){
              return true; 
            }
          }
        );
        this.books.splice(bookIndexToRemove, 1);
          this.saveBooks();
          this.emitBooks();
      }
}
