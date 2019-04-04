import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
import { Book } from '../models.ts/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;

  constructor(private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.getbooks();
    this.booksService.emitBooks();
  }

  onNewBook(){
    this.router.navigate(['/books', 'new']);
  }
  onDeleteBook(book: Book){
    this.booksService.removeBook(book);
  }
  onViewBook(id: number){
    this.router.navigate(['/books', 'view', id]);
  }
  ngOnDestroy(){
    this.booksSubscription.unsubscribe();
  }
}
