import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor() { }

  getUsers(): Observable<User[]>{
    const url   = `${ this.baseUrl }/auth`;
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    return this.http.get<User[]>(url, {headers});
  }

}
