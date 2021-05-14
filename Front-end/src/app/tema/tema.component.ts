import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../models/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema();
  listaTemas: Tema[];

   // Injetar depedência
  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }
    // Comportamentos do component fica no init
  // tslint:disable-next-line: typedef
  ngOnInit(){
    if (environment.token == ''){
      alert('Sua sessão expirou faça login novamente');
      this.router.navigate( ['/entrar'] );
    }
    this.findAllTemas();
  }

  // tslint:disable-next-line: typedef
  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
       this.listaTemas = resp;
    });

  }
  // tslint:disable-next-line: typedef
  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      alert('Tema cadastrado com sucesso!');
      this.findAllTemas();
      this.tema = new Tema();
    });
  }

}
