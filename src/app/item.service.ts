import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Item} from './item';
import {MessageService} from './message.service';
import {catchError, map, tap,} from 'rxjs/operators';
import {UUID} from 'angular2-uuid';
import {CreateItem} from './create-item';
import {StockUrgency} from './stockUrgency';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsUrl: string;
  private newItemUrl: string;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient, private messageService: MessageService) {
    this.itemsUrl = 'http://localhost:9000/items';
    this.newItemUrl = 'http://localhost:9000/newitem';
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getItemNo404<Data>(id: UUID): Observable<Item> {
    const url = `${this.itemsUrl}/?id=${id}`;
    return this.http.get<Item[]>(url)
      .pipe(
        map(items => items[0]), // returns a {0|1} element array
        tap(item => {
          const outcome = item ? `fetched` : `did not find`;
          this.log(`${outcome} item id=${id}`);
        }),
        catchError(this.handleError<Item>(`getItem id=${id}`))
      );
  }

  getItem(id: string | null): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }

  // searchItems(term: string): Observable<Item[]> {
  //   if (!term.trim()) {
  //     return of([]);
  //   }
  //   return this.http.get<Item[]>(`${this.itemsUrl}`).pipe(
  //     tap(x => x.length ?
  //       this.log(`found ${x.length} items matching "${term}"`) :
  //       this.log(`no items matching "${term}"`)),
  //     catchError(this.handleError<Item[]>('searchItems', []))
  //   );
  // }
  searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.getItems().pipe(map(items => items.filter(item => item.name.toLowerCase().startsWith(term.toLowerCase()))),
      tap(x => x.length ?
        this.log(`found ${x.length} items matching "${term}"`) :
        this.log(`no items matching "${term}"`)),
      catchError(this.handleError<Item[]>('searchItems', []))
    );
  }

  addItem(item: CreateItem): Observable<CreateItem> {
    return this.http.post<CreateItem>(this.itemsUrl, item, this.httpOptions).pipe(
      tap((newItem: CreateItem) => this.log(`added item w/ name=${newItem.name}`)),
      catchError(this.handleError<CreateItem>('addItem'))
    );
  }

  deleteItem(item: Item | string): Observable<Item> {
    const id = typeof item === 'string' ? item : item.id;
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<Item>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  /** PUT: update the item on the server */
  updateItem(item: Item | undefined): Observable<any> {
    return this.http.put(this.itemsUrl, item, this.httpOptions).pipe(
      tap(_ => this.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }
  // tslint:disable-next-line:typedef
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
  // tslint:disable-next-line:typedef
  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }
}

// Filter by name only
// Filtering is not case-sensitive
// Filtering is based-on a starts-with strategy.
// The filtering can be performed purely on the frontend side.
