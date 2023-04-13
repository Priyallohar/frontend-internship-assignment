import { Component, OnInit,ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TableViewComponent } from '../../shared/table-view/table-view.component';

interface Book {
  title: string;
  key: string;
  authors: { name: string }[];
  first_publish_year: number;
  author_name: string;
}

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchResults: any[];
  @ViewChild(TableViewComponent) tableView!: TableViewComponent

  constructor(private http: HttpClient) {
    this.bookSearch = new FormControl('');
    this.searchResults = [];
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      )
      .subscribe((value: string) => {
        let bookSearchResponse;
        let authorSearchResponse;
  
        this.http.get(`https://openlibrary.org/search.json?title=${value}`)
          .subscribe((response: any) => {
            bookSearchResponse = response;
            const bookResults = bookSearchResponse.docs.map((book: any) => ({
              title: book.title,
              key: book.key,
              authors: book.author_name?.map((name: string) => ({ name })) || [],
              first_publish_year: book.first_publish_year,
              author_name: book.author_name?.join(", ") || "Unknown"
            }));
            this.tableView.booksList = [...bookResults, ...this.searchResults];
          });
  
        this.http.get(`https://openlibrary.org/search/authors.json?q=${value}`)
          .subscribe((response: any) => {
            authorSearchResponse = response;
            const authorResults = authorSearchResponse.docs.map((book: any) => ({
              title: book.top_work,
              key: book.key,
              authors: [{name:book.name}],
              first_publish_year: book.first_publish_year || 1111,
              author_name: book.name || "Unknown"
            }));
            this.searchResults = authorResults;
            this.tableView.booksList = [...authorResults, ...this.searchResults];
          });
      });
  }

}  

          

