import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/user.service';
import { DatosService} from 'src/app/services/datos.service';
@Component({
  selector: 'app-list-datos',
  templateUrl: './list-datos.component.html',
  styleUrls: ['./list-datos.component.scss']
})


export class ListDatosComponent implements OnInit {
  userDetails: any;

  constructor(private service: UsersService,private Datoservice: DatosService) { }


  IdSegundaEstacion: string | undefined;
  IdPrimeraEstacion: string | undefined;
  FechaInicio: string | undefined;
  FechaFin: string | undefined;
  HoraInicio: string | undefined;
  HoraFin: string | undefined;

  currentEstacion: any;
  date1= new Date();
  

  currentYear= this.date1.getUTCFullYear();
  currentMonth = this.date1.getUTCMonth()+1;
  currentDay = this.date1.getUTCDate();

  hora = this.date1.getHours();
  minuto = this.date1.getMinutes();
  segundos = this.date1.getSeconds();

  DateInicio:any;
  DateFin:any;
  FinalMonth: any;
  FinalDay: any;
  Tiempo:any;
  Hora:any;
  Minuto:any;
  ngOnInit() {

    console.log(this.date1);
    let h = this.hora;
    let m = this.minuto;
    
    if(this.hora<10){
      this.Hora= "0"+h;
    }else{
      this.Hora= h;
    }

    if(this.minuto<10){
      this.Minuto="0"+m;
    }else{
      this.Minuto=m;
    }

    this.Tiempo = this.Hora + ":" + this.Minuto ;


    if(this.currentMonth<10)
    { 
      this.FinalMonth="0"+this.currentMonth;
    }else{
      this.FinalMonth=this.currentMonth;
    }

    if(this.currentDay <10)
    {
      this.FinalDay ="0"+this.currentDay;
    }else{
      this.FinalDay = this.currentDay;
    }

    this.DateInicio = this.currentYear+"-"+this.FinalMonth+"-01";
    this.DateFin = this.currentYear+"-"+this.FinalMonth+"-"+this.FinalDay;

    this.getEstacion(1);
    this.service.getUsuario(1).subscribe(
      res => {
        let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('token');
      console.log(headers.append('Authorization', `Bearer ${authToken}`));

        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
  }
  
  changes(event:any){
    console.log(event);
    var idEstacion = event.target['value'];
        
  }
  
  onChange(event:any){
    
    
  }

  Onchange2(event:any){
    this.IdSegundaEstacion=event.target['value'];
    
  }

  consultarInformacion(){

  }

  getEstacion(id: number) {

    this.service.getUsuario(1)
      .subscribe(
        data => {
          this.currentEstacion = data.empresa.estacion;
         
        },
        error => {
          console.log(error);
        });
  }

}
