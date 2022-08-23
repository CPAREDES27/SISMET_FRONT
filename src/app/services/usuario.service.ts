import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const baseUrl = 'https://localhost:7275/api/Usuario';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

 
  get(id: any) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any) {
    return this.http.post(`${baseUrl}/ObtenerUsuarios`, data);
  }

  update(id: any, data: any) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any) {
    return this.http.delete(`${baseUrl}/${id}`);
  }


 


}