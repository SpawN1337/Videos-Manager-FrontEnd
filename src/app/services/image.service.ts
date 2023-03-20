import { Injectable } from "@angular/core";
import { HttpClient,HttpErrorResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Observable } from 'rxjs';
import { Image } from "../models/Image";
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class  ImageService {

  private images: Image[] = [];
  private images$ = new Subject<Image[]>();
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  allIimages() {
    return this.http.get(`${this.baseUrl}/getimages`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    )
  }
  getImages() {
    this.http
      .get<{ images: Image[] }>(`${this.baseUrl}/getimages`)
      .pipe(
        map((imageData) => {
          return imageData.images;
        })
      )
      .subscribe((images) => {
        this.images = images;
        this.images$.next(this.images);
      });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
  getImagesStream() {
    return this.images$.asObservable();
  }

  addImage(name: string,image: File): Observable<any> {
    var imageData: any = new FormData();
    imageData.append("name", name);
    imageData.append("image", image, name);

    return this.http.post<{ image: Image }>(`${this.baseUrl}/upload`, imageData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  removeImage(id: any) {
    return this.http.delete(`${this.baseUrl}/removeupload/${id}`)
  }


  getImage(id: any) {
    return this.http.get(`${this.baseUrl}/getupload/${id}`)
  }

  updateImage(id: any, body: any) {
    return this.http.put(`${this.baseUrl}/updateupload/${id}`, body)

  }
}


