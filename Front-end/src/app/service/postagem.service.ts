import { Observable } from 'rxjs';

import { environment } from './../../environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Postagem } from './../models/Postagem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {

    headers: new HttpHeaders().set('Authorization', environment.token)// Passar o token no cabeçalho da req

  };

  getAllPostagens(): Observable<Postagem[]>{
  return this.http.get<Postagem[]>('http://localhosst:8080/postagens', this.token);
  }
  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('http://localhost:8080/postagens', postagem, this.token)
  }

}
