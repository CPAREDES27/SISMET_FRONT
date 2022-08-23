import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const baseUrl = 'https://localhost:7275/api/Empresa';



@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }


 


}