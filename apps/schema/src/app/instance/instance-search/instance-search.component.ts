import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'kgms-instance-search',
  templateUrl: './instance-search.component.html',
  styleUrls: ['./instance-search.component.css'],
})
export class InstanceSearchComponent {
  instances$!: Observable<any[]>;
  private searchTerms = new Subject<string>();

  constructor(private http: HttpClient) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.instances$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) =>
        this.http
          .get<any[]>(`http://localhost:3333/api/entity?term=${term}`)
          .pipe(
            tap((x) =>
              x.length
                ? this.log(`found instances matching "${term}"`)
                : this.log(`no instances matching "${term}"`)
            ),
            catchError(this.handleError<any[]>('searchInstances', []))
          )
      )
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }
}
