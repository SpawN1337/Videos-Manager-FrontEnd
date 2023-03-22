import { Injectable } from "@angular/core";
import { HttpClient,HttpErrorResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Observable } from 'rxjs';
import { Video } from "../models/Video";
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class  VideoService {

  private videos: Video[] = [];
  private videos$ = new Subject<Video[]>();
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  allVideos() {
    return this.http.get(`${this.baseUrl}/getvideos`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    )
  }
  getVideos() {
    this.http
      .get<{ videos: Video[] }>(`${this.baseUrl}/getvideos`)
      .pipe(
        map((videoData) => {
          return videoData.videos;
        })
      )
      .subscribe((videos) => {
        this.videos = videos;
        this.videos$.next(this.videos);
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
  getVideosStream() {
    return this.videos$.asObservable();
  }

  addVideo(name: string,aircraft: string,place: string,date: string,tag: string[],video: File): Observable<any> {
    var videoData: any = new FormData();
    videoData.append("name", name);
    videoData.append("aircraft", aircraft);
    videoData.append("place", place);
    videoData.append("date", date);
    videoData.append("tag", tag);
    videoData.append("video", video, name,aircraft,place,date,tag,);

    return this.http.post<{ video: Video }>(`${this.baseUrl}/upload`, videoData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  removeVideo(id: any) {
    return this.http.delete(`${this.baseUrl}/removeupload/${id}`)
  }


  getVideo(id: any) {
    return this.http.get(`${this.baseUrl}/getupload/${id}`)
  }

  updateVideo(id: any, body: any) {
    return this.http.put(`${this.baseUrl}/updateupload/${id}`, body)

  }
}


