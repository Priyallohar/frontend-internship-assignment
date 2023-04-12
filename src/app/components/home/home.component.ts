import { Component, OnInit,ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TableViewComponent } from '../../shared/table-view/table-view.component';



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
      ).
      subscribe((value: string) => {
        this.http.get(`https://openlibrary.org/search.json?title=${value}&author=${value}`)
          .subscribe((response: any) => {
            this.searchResults = response.docs;
            this.tableView.booksList = this.searchResults;
          });
      });
  }
}

