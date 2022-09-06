import { Component, OnInit, ElementRef } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "src/app/shared/user.service";
import { DatosService } from "src/app/services/datos.service";
import { MatDialog } from "@angular/material/dialog";
import { AgregarEstacionComponent } from "../agregar-estacion/agregar-estacion.component";
import { AuthenticationService } from "src/app/services/authentication.service";
import { EstacionService } from "src/app/services/estacion.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-list-datos",
  templateUrl: "./list-datos.component.html",
  styleUrls: ["./list-datos.component.scss"],
})
export class ListDatosComponent implements OnInit {

  selectedValue = null;
  
  userDetails: any;
  user: any;
  estacionid: any;

  constructor(
    private route: ActivatedRoute,
    public estacionService: EstacionService,
    private service: UsersService,
    public auth: AuthenticationService,
    private Datoservice: DatosService,
    private dialog: MatDialog
  ) {}

  estacionOne: any;
  estacionTwo: any;
  IdSegundaEstacion: string | undefined;
  IdPrimeraEstacion: string | undefined;
  FechaInicio: any;
  FechaFin: any ;
  HoraInicio: string | undefined;
  HoraFin: string | undefined;

  currentEstacion: any;
  date1 = new Date();

  HoraInicioFin: any;
  HoraFinFin: any;

  currentYear = this.date1.getUTCFullYear();
  currentMonth = this.date1.getUTCMonth() + 1;
  currentDay = this.date1.getUTCDate();

  hora = this.date1.getHours();
  minuto = this.date1.getMinutes();
  segundos = this.date1.getSeconds();

  DateInicio: any;
  DateFin: any;
  FinalMonth: any;
  FinalDay: any;
  Tiempo: any;
  Hora: any;
  Minuto: any;
  todayDatos:string="";
  todayDatosF:string="";
  carga:boolean=false;
  config:any;
  ngOnInit() {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 5
    }
    
    
    this.getAuthUsuario();

    if (this.user.rol == 2) {
      this.getEstacion(this.user.Id);
      this.estacionid=this.route.snapshot.paramMap.get("id")
      console.log(this.estacionid);

    }

    if (this.user.rol == 1) {
        this.ObtenerEstaciones();
        this.estacionid=this.route.snapshot.paramMap.get("id")
        console.log(this.estacionid)
    }

  

    console.log(this.user.Id);
    let h = this.hora;
    let m = this.minuto;

    if (this.hora < 10) {
      this.Hora = "0" + h;
    } else {
      this.Hora = h;
    }

    if (this.minuto < 10) {
      this.Minuto = "0" + m;
    } else {
      this.Minuto = m;
    }

    this.Tiempo = this.Hora + ":" + this.Minuto;

    if (this.currentMonth < 10) {
      this.FinalMonth = "0" + this.currentMonth;
    } else {
      this.FinalMonth = this.currentMonth;
    }

    if (this.currentDay < 10) {
      this.FinalDay = "0" + this.currentDay;
    } else {
      this.FinalDay = this.currentDay;
    }

    this.DateInicio = this.currentYear + "-" + this.FinalMonth + "-01";
    this.DateFin =
      this.currentYear + "-" + this.FinalMonth + "-" + this.FinalDay;
    this.FechaInicio = this.DateInicio;
    this.FechaFin = this.DateFin;
    this.HoraInicio = this.Tiempo;
    this.HoraFin = this.Tiempo;
    this.service.getUsuario(this.user.Id).subscribe(
      (res) => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let authToken = localStorage.getItem("token");
        console.log(headers.append("Authorization", `Bearer ${authToken}`));

        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );

    const Filtros = {
      idPrimeraEstacion: 1,
      idSegundaEstacion: 1,
      fechaInicio: this.FechaInicio,
      fechaFin: this.FechaFin,
      horaInicio: this.HoraInicio,
      horaFin: this.HoraFin,
    };

    this.Datoservice.postDavis(Filtros).subscribe(
      (data) => {
        //Aqui rata arreglo de estaciones
        this.estacionOne = data.estacion;
        this.estacionTwo = data.secondEstacion;
      },
      (error) => {
        console.log(error);
      }
    );

  }
  pageChanged(event:any){

  }
  openDialog() {
    const dialogRef = this.dialog.open(AgregarEstacionComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getEstacionFromMap(id: string | null) {
    this.estacionService.get(id).subscribe(
      (data) => {
        this.currentEstacion = data;
        console.log(data);


      },
      
      (error) => {
        console.log(error);
      }
    );
  }

  changes(event: any) {
    console.log(event.target["value"]);
    var idEstacion = event.target["value"];
  }

  onChange(event: any) {
    console.log(event.target["value"]);
    this.IdPrimeraEstacion = event.target["value"];
    this.estacionid = event.target["value"];
  }

  Onchange2(event: any) {
    this.IdSegundaEstacion = event.target["value"];
    console.log(event.target["value"]);
  }
  OnFechaInicio(event: any) {
    this.FechaInicio = event.target["value"];
  }
  OnFechaFin(event: any) {
    this.FechaFin = event.target["value"];
  }
  OnHoraInicio(event: any) {
    this.HoraInicio = event.target["value"];
    this.HoraInicio = this.HoraInicio + ":00";
  }
  OnHoraFin(event: any) {
    this.HoraFin = event.target["value"];
    this.HoraFin = this.HoraFin + ":00";

  }

  consultarInformacion():boolean {

   


    const dateI = new Date(this.FechaInicio);
    const dateF = new Date(this.FechaFin);

    if(dateI> dateF){
      Swal.fire({
        title: '',
        html: 'La fecha inicial no debe ser mayor a la fecha final',
        imageWidth:"100px",
        icon:'warning',
        confirmButtonColor: '#083E5E',
        confirmButtonText: 'Aceptar'
      });
    this.carga=false;
    return false;
  }
    
  const Filtros = {
    idPrimeraEstacion: Number(this.IdPrimeraEstacion),
    idSegundaEstacion: Number(this.IdSegundaEstacion),
    fechaInicio: this.FechaInicio,
    fechaFin: this.FechaFin,
    horaInicio: this.HoraInicio,
    horaFin: this.HoraFin,
  };
  this.carga= true;
    this.Datoservice.postDavis(Filtros).subscribe(
      (data) => {
        this.carga=false;
        //Aqui rata arreglo de estaciones
        this.estacionOne = data.estacion;
        this.estacionTwo = data.secondEstacion;
      },
      (error) => {
        console.log(error);
      }
    );
return true;
    
  }

  ExportarDatos(){

    const Filtros = {
      idPrimeraEstacion: Number(this.IdPrimeraEstacion),
      idSegundaEstacion: Number(this.IdSegundaEstacion),
      fechaInicio: this.FechaInicio,
      fechaFin: this.FechaFin,
      horaInicio: this.HoraInicio,
      horaFin: this.HoraFin,
    };


    if(this.FechaInicio> this.FechaFin){
      Swal.fire({
        title: '',
        html: 'La fecha inicial no debe ser mayor a la fecha final',
        imageWidth:"100px",
        icon:'warning',
        confirmButtonColor: '#083E5E',
        confirmButtonText: 'Aceptar'
      });
    
    
    }
    else{
      this.Datoservice.ExportarDatos(Filtros).subscribe(blobFile =>{
        const url = window.URL.createObjectURL(blobFile);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style','display: none');
        a.href = url;
        a.download= 'ExportarDatos.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });
    }
}


  
  ObtenerEstaciones() {
    this.estacionService.getAll().subscribe(
      (data) => {
        this.currentEstacion = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAuthUsuario() {
    this.user = this.auth.getUsuarioPerfil();
    console.log(this.user);
  }

  getEstacion(id: number) {
   
    this.service.getUsuario(this.user.Id).subscribe(
      (data) => {
        this.currentEstacion = data.empresa.estacion;
        this.IdPrimeraEstacion = String(data.empresa.estacion[0].id);
        this.IdSegundaEstacion = String(data.empresa.estacion[0].id);

      },
      (error) => {
        console.log(error);
      }
    );

    
  }
}
