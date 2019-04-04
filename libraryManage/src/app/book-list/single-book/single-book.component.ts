import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models.ts/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
     // on créer un book vide temporaire en attendant que le resultat de la recherche soit disponible
     // une fois que le livre est récupéré depuis le serveur il remplace le book temporaire vide 
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

    // méthode pour faire un retour en arrière 
  onBack(){
    this.router.navigate(['/books']);
  }

}
