import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const baseUrl = 'https://localhost:7275/api/davis';




@Injectable({
  providedIn: 'root'
})
export class EstacionService {

  constructor(private http: HttpClient) { }

  get(id: any) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getAll() {
    return this.http.get(`${baseUrl}/GetEstaciones`);
  }


 


}