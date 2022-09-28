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
  visible :boolean=false;
  primeraEstacion:string="";
  segundaEstacion:string="";
  constructor(
    private route: ActivatedRoute,
    public estacionService: EstacionService,
    private service: UsersService,
    public auth: AuthenticationService,
    private Datoservice: DatosService,
    private dialog: MatDialog,
    public router: Router
  ) { }

  estacionOne: any;
  estacionTwo: any;
  IdSegundaEstacion: string | undefined;
  IdPrimeraEstacion: string | undefined;
  FechaInicio: any;
  FechaFin: any;
  HoraInicio: string | undefined;
  HoraFin: string | undefined;
  primeraEstacionTest:string="";
  segundaEstacionTest:string="";
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
  estacionB : boolean=false;
  DateInicio: any;
  DateFin: any;
  FinalMonth: any;
  FinalDay: any;
  Tiempo: any;
  Hora: any;
  Minuto: any;
  todayDatos: string = "";
  todayDatosF: string = "";
  carga: boolean = false;
  config: any;
  config2: any;
  isItemsPerPage = true;
  p = 1;
  ngOnInit() {
    if (localStorage.getItem("token") == null || localStorage.getItem("token") === undefined)
      this.router.navigateByUrl("/login");
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 10
    }
    this.config2 = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 10
    }


    this.getAuthUsuario();

    if (this.user.rol == 2) {
      this.visible=true;
      this.getEstacion(this.user.Id);
      this.estacionid = this.route.snapshot.paramMap.get("id")
    }

    if (this.user.rol == 1) {
      this.estacionB =true;
      this.ObtenerEstaciones();
      this.estacionid = this.route.snapshot.paramMap.get("id")
      this.IdPrimeraEstacion = "1";
      this.IdSegundaEstacion = "1";
    }



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

        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
  

  }
  getMembers(pageNumber: number = 1) {
    var Filtros = {
      idPrimeraEstacion: Number(this.IdPrimeraEstacion),
      idSegundaEstacion: Number(this.IdSegundaEstacion),
      fechaInicio: this.FechaInicio,
      fechaFin: this.FechaFin,
      horaInicio: this.HoraInicio,
      horaFin: this.HoraFin,
      pagina: pageNumber,
      recordsPorPagina: 10
    };
    this.Datoservice.postDavisPaginado(Filtros).subscribe(data => {
      this.estacionOne = data.estacion;
      this.estacionTwo = data.secondEstacion;
      this.config = {
        itemsPerPage: 10,
        currentPage: pageNumber,
        totalItems: data.totalEstacionOne
      };
      this.config2 = {
        itemsPerPage: 10,
        currentPage: pageNumber,
        totalItems: data.totalEstacionTwo
      };
    });
  }
  getMembers2(pageNumber: number = 1) {
    var Filtros = {
      idPrimeraEstacion: Number(this.IdPrimeraEstacion),
      idSegundaEstacion: Number(this.IdSegundaEstacion),
      fechaInicio: this.FechaInicio,
      fechaFin: this.FechaFin,
      horaInicio: this.HoraInicio,
      horaFin: this.HoraFin,
      pagina: pageNumber,
      recordsPorPagina: 10
    };
    this.Datoservice.postDavisPaginado(Filtros).subscribe(data => {
      this.estacionOne = data.estacion;
      this.estacionTwo = data.secondEstacion;
      this.config = {
        itemsPerPage: 10,
        currentPage: pageNumber,
        totalItems: data.totalEstacionOne
      };
      this.config2 = {
        itemsPerPage: 10,
        currentPage: pageNumber,
        totalItems: data.totalEstacionTwo
      };
    });
  }
  pageChanged(event: any) {

    this.getMembers(event);
  }
  pageChanged2(event: any) {

    this.getMembers2(event);
  }
  openDialog() {

    const dialogRef = this.dialog.open(AgregarEstacionComponent);

    dialogRef.afterClosed().subscribe((result) => {

      this.ObtenerEstaciones();
   
    });
  }



  getEstacionFromMap(id: string | null) {
    this.estacionService.get(id).subscribe(
      (data) => {
        this.currentEstacion = data;


      },

      (error) => {
        console.log(error);
      }
    );
  }

  changes(event: any) {
    var idEstacion = event.target["value"];
  }

  onChange(event: any) {
    this.IdPrimeraEstacion = event.target["value"];
    this.estacionid = event.target["value"];
     
    for(var i=0;i<this.currentEstacion.length;i++){
      if(this.currentEstacion[i].id == this.IdPrimeraEstacion){
        this.primeraEstacionTest = this.currentEstacion[i].nombreEstacion;
      }
    }
  
    
  }

  Onchange2(event: any) {
    this.IdSegundaEstacion = event.target["value"];
    let number = Number(this.IdSegundaEstacion);
    
    for(var i=0;i<this.currentEstacion.length;i++){
      if(this.currentEstacion[i].id == this.IdSegundaEstacion){
        this.segundaEstacionTest = this.currentEstacion[i].nombreEstacion;
      }
    }
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


  consultarInformacion(): boolean {
    const dateI = new Date(this.FechaInicio);
    const dateF = new Date(this.FechaFin);
    debugger;
    this.primeraEstacion = this.primeraEstacionTest;
    this.segundaEstacion = this.segundaEstacionTest;
    if (dateI > dateF) {
      Swal.fire({
        title: '',
        html: 'La fecha inicial no debe ser mayor a la fecha final',
        imageWidth: "100px",
        icon: 'warning',
        confirmButtonColor: '#083E5E',
        confirmButtonText: 'Aceptar'
      });
      this.carga = false;
      return false;
    }

    var Filtros = {
      idPrimeraEstacion: Number(this.IdPrimeraEstacion),
      idSegundaEstacion: Number(this.IdSegundaEstacion),
      fechaInicio: this.FechaInicio,
      fechaFin: this.FechaFin,
      horaInicio: this.HoraInicio,
      horaFin: this.HoraFin,
      pagina: 1,
      recordsPorPagina: 10
    };

    this.carga = true;
    this.Datoservice.postDavisPaginado(Filtros).subscribe(
      (data) => {
        this.carga = false;
        //Aqui rata arreglo de estaciones
        if(data.totalEstacionOne == 0){
         this.estacionOne =[]; 
        }else{
          this.primeraEstacion=this.primeraEstacionTest;
          this.estacionOne = data.estacion;
          this.config = {
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: data.totalEstacionOne
          };
        }
        if(data.totalEstacionTwo == 0){
          this.estacionTwo = [];
        }else{
          this.segundaEstacion = this.segundaEstacionTest;
          this.estacionTwo = data.secondEstacion;
          this.config2 = {
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: data.totalEstacionTwo
          };
        }
       
      },
      (error) => {
        this.carga=false;
        Swal.fire({
          title: '',
          html: 'No hay conexión con el servidor',
          imageWidth: "100px",
          icon: 'error',
          confirmButtonColor: '#083E5E',
          confirmButtonText: 'Aceptar'
        });
      }
    );
    return true;

  }

  ExportarDatos() {

    const Filtros = {
      idPrimeraEstacion: Number(this.IdPrimeraEstacion),
      idSegundaEstacion: Number(this.IdSegundaEstacion),
      fechaInicio: this.FechaInicio,
      fechaFin: this.FechaFin,
      horaInicio: this.HoraInicio,
      horaFin: this.HoraFin,
    };


    if (this.FechaInicio > this.FechaFin) {
      Swal.fire({
        title: '',
        html: 'La fecha inicial no debe ser mayor a la fecha final',
        imageWidth: "100px",
        icon: 'warning',
        confirmButtonColor: '#083E5E',
        confirmButtonText: 'Aceptar'
      });


    }
    else {
      this.carga = true;
      this.Datoservice.ExportarDatos(Filtros).subscribe(blobFile => {
        this.carga = false;
        const url = window.URL.createObjectURL(blobFile);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = 'ExportarDatos.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      (error)=>{
        Swal.fire({
          title: '',
          html: 'No hay conexión con el servidor',
          imageWidth: "100px",
          icon: 'error',
          confirmButtonColor: '#083E5E',
          confirmButtonText: 'Aceptar'
        });
        this.carga = false;
      });
    }
  }



  ObtenerEstaciones() {
    this.estacionService.getAll().subscribe(
      (data) => {
        this.currentEstacion = data;
        this.primeraEstacion = data[0].nombreEstacion; 
       
        this.segundaEstacion =data[0].nombreEstacion; 


        this.IdPrimeraEstacion = String(data[0].id);
        this.IdSegundaEstacion = String(data[0].id);
        this.primeraEstacion = data[0].nombreEstacion;
        this.segundaEstacion = data[0].nombreEstacion;
        this.segundaEstacionTest = this.primeraEstacion;
        this.primeraEstacionTest = this.segundaEstacion;
        var Filtros = {
          idPrimeraEstacion:this.IdPrimeraEstacion,
          idSegundaEstacion: this.IdPrimeraEstacion,
          fechaInicio: this.FechaInicio,
          fechaFin: this.FechaFin,
          horaInicio: this.HoraInicio,
          horaFin: this.HoraFin,
          pagina: 1,
          recordsPorPagina: 10
        };
    
        this.Datoservice.postDavisPaginado(Filtros).subscribe(
          (data) => {
            //Aqui rata arreglo de estaciones
            this.estacionOne = data.estacion;
            this.estacionTwo = data.secondEstacion;
            this.config = {
              itemsPerPage: 10,
              currentPage: 1,
              totalItems: data.totalEstacionOne
            };
            this.config2 = {
              itemsPerPage: 10,
              currentPage: 1,
              totalItems: data.totalEstacionTwo
            };
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAuthUsuario() {
    this.user = this.auth.getUsuarioPerfil();
  }

  getEstacion(id: number) {
    this.carga=true;
    this.service.getUsuario(this.user.Id).subscribe(
      (data) => {
        this.currentEstacion = data.empresa.estacion;
         this.carga=false;
        this.IdPrimeraEstacion = String(data.empresa.estacion[0].id);
        this.IdSegundaEstacion = String(data.empresa.estacion[0].id);
        this.primeraEstacion = data.empresa.estacion[0].nombreEstacion;
        this.segundaEstacion = data.empresa.estacion[0].nombreEstacion;
        this.segundaEstacionTest = this.primeraEstacion;
        this.primeraEstacionTest = this.segundaEstacion;
        var Filtros = {
          idPrimeraEstacion:this.IdPrimeraEstacion,
          idSegundaEstacion: this.IdPrimeraEstacion,
          fechaInicio: this.FechaInicio,
          fechaFin: this.FechaFin,
          horaInicio: this.HoraInicio,
          horaFin: this.HoraFin,
          pagina: 1,
          recordsPorPagina: 10
        };
        this.carga=true;
        this.Datoservice.postDavisPaginado(Filtros).subscribe(
          
          (data) => {
            //Aqui rata arreglo de estaciones
            this.estacionOne = data.estacion;
            this.estacionTwo = data.secondEstacion;
            this.config = {
              itemsPerPage: 10,
              currentPage: 1,
              totalItems: data.totalEstacionOne
            };
            this.config2 = {
              itemsPerPage: 10,
              currentPage: 1,
              totalItems: data.totalEstacionTwo
            };
            this.carga=false;
          },
          (error) => {
            console.log(error);
          }
        );
      
      },
      (error) => {
        Swal.fire({
          title: '',
          html: 'No hay conexión con el servidor',
          imageWidth: "100px",
          icon: 'error',
          confirmButtonColor: '#083E5E',
          confirmButtonText: 'Aceptar'
        });
        this.carga=false;
      }
    );


  }
}
