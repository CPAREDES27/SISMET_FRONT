import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';



const baseUrl = 'https://localhost:7275/api/Empresa';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private rol:string="";
  

  constructor(private http: HttpClient) { }

  getUsuarioPerfil() {
    
    var token = localStorage.getItem('token');
    if(token != null)
    this.rol=jwtDecode(token)
    console.log(this.rol)
  }


 


}