import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  endpoint = "http://winapp/Moshaver_rahbordi/_api/Lists(guid'4C2EF067-7372-4483-8B2F-8046217B1F94')/Items";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) {


  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public getProducts(): Observable<any> {
    return this.http.get(this.endpoint + 'products').pipe(
      map(this.extractData));
  }

  addProduct(product): Observable<any> {
    console.log(product);
    return this.http.post<any>(this.endpoint + 'products', JSON.stringify(product), this.httpOptions).pipe(
      tap((product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }
  //Add a function to PUT an updated product data by ID to the REST API using HttpClient then subscribe to the response to RxJS Observable.

  updateProduct(id, product): Observable<any> {
    return this.http.put(this.endpoint + 'products/' + id, JSON.stringify(product), this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  //Add a function to DELETE product by ID to the REST API using Angular HttpClient then subscribe to the response to RxJS Observable.

  deleteProduct(id): Observable<any> {
    return this.http.delete<any>(this.endpoint + 'products/' + id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
