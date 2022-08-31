import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 


@Injectable({
    providedIn: 'root'
  })
  export class DatosService {
    urlServices: string= environment.urlService;
    constructor(private http: HttpClient) { }
  
    postDavis(data:any) {
      const baseUrl = `${this.urlServices}Davis`;
      return this.http.post(baseUrl,data);
    }
  
  
   
  
  
  }