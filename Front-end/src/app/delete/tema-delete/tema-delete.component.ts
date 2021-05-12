import { Router, ActivatedRoute } from '@angular/router';
import { TemaService } from './../../service/tema.service';
import { Tema } from './../../models/Tema';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema();
  idTema: number;

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if (environment.token == ''){
      alert('Seu token expirou, faça o login novamente.');
      this.router.navigate(['/entrar']);
    }
    this.idTema = this.route.snapshot.params['id'];
    this.findyByIdTema(this.idTema);
  }
  findyByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }
  apagar() {
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      alert('tema apagado com sucesso');
    });
  }

}
