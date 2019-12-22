import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { EnvVars } from '../EnvVars';
import { Form11Model } from 'src/app/models/form11Model';

@Injectable({
  providedIn: 'root'
})
export class RestService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpPostOptions;
  toast

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public url: EnvVars
  ) {


  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public getProducts(): Observable<any> {
    return this.http.get(this.url.abs('ostan')).pipe(
      map(this.extractData));
  }

  addItem(listName: string, _data: Form11Model): Observable<any> {

    this.setHttpOptions();

    let spDataListItem = "SP.Data." + listName + "ListItem";

    var data = {
      __metadata: {
        type: spDataListItem
      },
      Title: _data.title,
      Date1: _data.fromDate,
      Date2: _data.toDate,

      Tedad_kol_Parvandeh: _data.Tedad_kol_Parvandeh,
      Tedad_Motale_Tarahi: _data.Tedad_Motale_Tarahi,
      Tedad_Erjae_Kar: _data.Tedad_Erjae_Kar,
      Tedad_Tamin_Tajhizat: _data.Tedad_Tamin_Tajhizat,
      Tedad_ejra: _data.Tedad_ejra,
      Tedad_Tahvil: _data.Tedad_Tahvil,
      Tedad_Bahrebardari: _data.Tedad_Bahrebardari,
      Tedad_Mostanadsazi: _data.Tedad_Mostanadsazi,

      Baresi_Parvandeh: _data.Baresi_Parvandeh,
      Baresi_motale_Tarihi: _data.Baresi_motale_Tarihi,
      Baresi_ejrae_kar: _data.Baresi_ejrae_kar,
      Baresi_Tamin_Tajhizat: _data.Baresi_Tamin_Tajhizat,
      Baresi_Ejra: _data.Baresi_Ejra,
      Baresi_Tahvil: _data.Baresi_Tahvil,
      Baresi_Bahrebardari: _data.Baresi_Bahrebardari,
      Baresi_Mostanadsazi: _data.Baresi_Mostanadsazi,


    };

    console.log(data);
    return this.http.post<any>(this.url.abs('form'), JSON.stringify(data), this.httpPostOptions).pipe(
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

    return this.http.put(this.url.abs('form1'), JSON.stringify(product), this.httpPostOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  //Add a function to DELETE product by ID to the REST API using Angular HttpClient then subscribe to the response to RxJS Observable.

  deleteProduct(id): Observable<any> {

    this.setHttpOptions();

    return this.http.delete<any>(this.url.abs('form1'), this.httpPostOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead

      if (error.status == 403) {
        this.showToast("please go to first page and login again");
      }
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  showToast(msg) {
    this.toast = this.toastController.create({
      message: msg,
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
    this.showToast2(msg)
  }

  showToast2(msg) {
    this.toast = this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'middle',
      closeButtonText: 'OK',
      animated: true,
      cssClass: "my-custom-class"
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });

  }

  async HideToast() {
    this.toast = this.toastController.dismiss();
  }
}