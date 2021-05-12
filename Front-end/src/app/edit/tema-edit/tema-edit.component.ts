import { Tema } from 'src/app/models/Tema';
import { environment } from 'src/environments/environment.prod';
import { TemaService } from './../../service/tema.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema();

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute  // rota ativa
    ){}

  ngOnInit(){
    window.scroll(0, 0);

    if (environment.token === ''){
      alert('Seu token expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])

    }
    let id = this.route.snapshot.params['id'];
    this.findByidTema(id);
  }
  findByidTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }
  atualizar(){
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      alert('Tema Atualizado');
      this.router.navigate(['/tema']);
    });
  }
}
