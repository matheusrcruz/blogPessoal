import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaService } from './../../service/tema.service';
import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/models/Tema';

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
    if (environment.token === ''){
      this.router.navigate(['/entrar']);
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
