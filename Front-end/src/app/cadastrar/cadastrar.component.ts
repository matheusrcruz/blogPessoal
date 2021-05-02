import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  //Instaciar um objeto ;
  usuario: User = new User()
  tipoUsuario: string
  confirmaSenha: string

  constructor(
  //referencia service autenticação;
    private auth: AuthService,  //injeção de dependencia;
    private router: Router                 // modificador de acesso, variavel e modulo;
  ){}

//NG init Quando iniciar page faça
  ngOnInit(){
    window.scroll(0,0);  
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value;
  }
  confirmSenha(event: any){
    this.confirmaSenha = event.target.value;
  }
  cadastrar(){
    this.usuario.tipo = this.tipoUsuario;
    if(this.confirmaSenha != this.usuario.senha){
      alert('Senhas não coincidem')
    }else{
      this.auth.cadastrar(this.usuario).subscribe((resp: User)=>{
        this.usuario = resp;
        alert('Usuario cadastrado com sucesso!');
        this.router.navigate(['/entrar'])
      })
    }
  }
}
