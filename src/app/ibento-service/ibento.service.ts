import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {Ibento} from './ibento';
import {IbentoList} from './ibento-list';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class IbentoService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private static log(message: string) {
    console.log(message);
  }

  /** GET ID */
  getIbento(id: string): Observable<Ibento> {
    const url = `${environment.API_URL}/${id}`;

    return this.http.get<Ibento>(url).pipe(
      tap(_ => IbentoService.log(`fetched ibento id=${id}`)),
      catchError(this.handleError<Ibento>(`getIbento id=${id}`))
    );
  }

  /** GET ALL */
  getIbentos(): Observable<IbentoList[]> {
    return this.http.get<IbentoList[]>(environment.API_URL)
      .pipe(
        tap(_ => IbentoService.log('fetched all ibentos')),
        catchError(this.handleError<IbentoList[]>('getIbentos', []))
      );
  }

  /** GET SEARCH */
  searchIbentos(term: string): Observable<Ibento[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Ibento[]>(`${environment.API_URL}/find?name=${term}`).pipe(
      tap(x => x.length ?
        IbentoService.log(`found ibentos matching "${term}"`) :
        IbentoService.log(`no ibentos matching "${term}"`)),
      catchError(this.handleError<Ibento[]>('searchIbentos', []))
    );
  }

  /** POST */
  addIbento(ibento: Ibento): Observable<Ibento> {
    return this.http.post<Ibento>(environment.API_URL, ibento, this.httpOptions).pipe(
      tap((ibentoCreated: Ibento) => IbentoService.log(`added ibento id=${ibentoCreated.id}`)),
      catchError(this.handleError<Ibento>('updateIbento'))
    );
  }

  /** PUT */
  updateIbento(ibento: Ibento): Observable<Ibento> {
    return this.http.put<Ibento>(environment.API_URL, ibento, this.httpOptions).pipe(
      tap((ibentoUpdated: Ibento) => IbentoService.log(`updated ibento id=${ibentoUpdated.id}`)),
      catchError(this.handleError<Ibento>('updateIbento'))
    );
  }

  /** DELETE */
  deleteIbento(id: string): Observable<any> {
    const url = `${environment.API_URL}/${id}`;

    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => IbentoService.log(`deleted ibento id=${id}`)),
      catchError(this.handleError('deleteIbento'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      IbentoService.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
