import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Receita } from '../models/receita.model';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  protected endpoint: string = '/pedido';
  protected restEndpoint: string = 'https://localhost:7115';

  protected ObterHeaderJson() {
    let headers: any = { 'Content-Type': 'application/json' };
    const token = this.Token;
    if(token)
      headers = {
        ...headers,
        'Authorization': 'Bearer ' + token,
      }
    return new HttpHeaders(headers);
  }

  get Token():string{
    let token = (localStorage.getItem("token"))?.toString() ?? '';
    return token;
  }

  constructor(public http: HttpClient,
    public router: Router,) { }

  public getAll = (): Observable<any> =>
    this.http.get(`${this.restEndpoint}${this.endpoint}`,{headers: this.ObterHeaderJson()})

  public searchCNPJ = (cnpj:string): Observable<any> =>
    this.http.get(`${this.restEndpoint}${this.endpoint}/searchCNPJ/${cnpj}`,{headers: this.ObterHeaderJson()})

  public addPedido = (model: Receita): Observable<any> =>
    this.http.post(`${this.restEndpoint}${this.endpoint}`, model, { headers: this.ObterHeaderJson() })
}

