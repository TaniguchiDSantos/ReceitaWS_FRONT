import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  protected endpoint: string = '/login';
  protected restEndpoint: string = 'https://localhost:7115';

  protected ObterHeaderJson() {
    let headers:any  = {'Content-Type': 'application/json'}    
    return new HttpHeaders(headers);
  }

  constructor
  (
    public http: HttpClient,
    public router: Router,
  )
  {}

  public verifyLogin = (model: User): Observable<any> =>
  this.http.post(`${this.restEndpoint}${this.endpoint}`,model, { headers: this.ObterHeaderJson() })

}
