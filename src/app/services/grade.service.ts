import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

export interface GradeData {

    grade: string,
}
export interface TableData extends Array<GradeData> { }

@Injectable({
  providedIn: 'root'
})

export class GradeService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  allGrades() {
    return this.httpClient.get<TableData>(`${this.baseUrl}/allgrades`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    )
  }

  
  addGrade(body: any) {
    return this.httpClient.post(`${this.baseUrl}/addgrade/`, body)
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

  removeGrade(id: any) {
    return this.httpClient.delete(`${this.baseUrl}/removegrade/${id}`)
  }
  getGrade(id: any) {
    return this.httpClient.get(`${this.baseUrl}/getgrade/${id}`)
  }

  updateGrade(id: any, body: any) {
    return this.httpClient.put(`${this.baseUrl}/updategrade/${id}`, body)

  }
}

