import { environment } from './../../environments/environment.prod';
import { User } from './../models/User';
import { Postagem } from './../models/Postagem';
import { PostagemService } from './../service/postagem.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TemaService } from '../service/tema.service';
import { Tema } from '../models/Tema';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem();
  listaTemas: Tema[];
  idTema: number;
  tema: Tema = new Tema();
  user: User = new User();
  idUser = environment.id;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }
  ngOnInit(){
    if(environment.token == ''){
      alert('Sua sessão expirou faça login novamente');
      this.router.navigate(['/entrar']);
  }
  this.getAllTemas();
 }
 getAllTemas(){
  this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
    this.listaTemas = resp
  } );
 }

 findByIdTema(){
   this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
     this.tema = resp
   })
 }
 publicar(){
   //atribuir o tema
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;
  // atribui o usuario
    this.user.id = this.idUser;
    this.postagem.usuario = this.user;

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) =>{
      this.postagem = resp;
      alert('postagem realizada com sucesso');
    })
 }

}
