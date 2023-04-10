import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

export interface PlaceData {

    place: string,
}
export interface TableData extends Array<PlaceData> { }

@Injectable({
    providedIn: 'root'
})

export class PlaceService {
    baseUrl = environment.baseUrl;

    constructor(private httpClient: HttpClient) { }

    allPlaces() {
        return this.httpClient.get<TableData>(`${this.baseUrl}/allplaces`).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError)
        )
    }


    addPlace(body: any) {
        return this.httpClient.post(`${this.baseUrl}/addplace/`, body)
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

    removePlace(id: any) {
        return this.httpClient.delete(`${this.baseUrl}/removeplace/${id}`)
    }

    getPlace(id: any) {
        return this.httpClient.get(`${this.baseUrl}/getplac/${id}`)
    }

    updatePlace(id: any, body: any) {
        return this.httpClient.put(`${this.baseUrl}/updateplace/${id}`, body)

    }
}

