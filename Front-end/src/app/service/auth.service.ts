import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { UserLogin } from '../models/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Inicie o modulo HttpClient na assinatura do constuctor
  constructor(private http: HttpClient) { }
  
  // Observable Olhe userLogin
          //[Sintaxe Metodo, alias: objeto ] 
  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('http://localhost:8080/usuarios/logar', userLogin)
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/usuarios/cadastrar', user)


  }

}
