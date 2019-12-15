import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  endpoint = "/Moshaver_rahbordi/_api/Lists(guid'4C2EF067-7372-4483-8B2F-8046217B1F94')/Items";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpPostOptions;

  constructor(
    private http: HttpClient
  ) {


  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public getProducts(): Observable<any> {
    return this.http.get(this.endpoint).pipe(
      map(this.extractData));
  }

  addProduct(productname): Observable<any> {

    this.setHttpOptions();

    var data = {
        __metadata: {
            type: "SP.Data.Ostan_x005f_ListListItem"
        },
        Title: productname
    };

    console.log(data);
    return this.http.post<any>(this.endpoint, JSON.stringify(data), this.httpPostOptions).pipe(
      tap((product) => console.log(`added product w/ id=${product}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }
  //Add a function to PUT an updated product data by ID to the REST API using HttpClient then subscribe to the response to RxJS Observable.

  setHttpOptions() {
    let digest: any = localStorage.getItem('token');

    this.httpPostOptions = {
      headers: new HttpHeaders({
        "accept": "application/json;odata=verbose",
        "X-RequestDigest": digest,
        "content-length": "10",
        "content-Type": "application/json;odata=verbose"
      })
    };
  }

  updateProduct(id, product): Observable<any> {

    this.setHttpOptions();

    return this.http.put(this.endpoint + 'products/' + id, JSON.stringify(product), this.httpPostOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  //Add a function to DELETE product by ID to the REST API using Angular HttpClient then subscribe to the response to RxJS Observable.

  deleteProduct(id): Observable<any> {

    this.setHttpOptions();

    return this.http.delete<any>(this.endpoint + 'products/' + id, this.httpPostOptions).pipe(
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
