import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/user.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { AuthenticationService } from '../services/authentication.service';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
 
  public ngAfterViewInit(): void {
    this.createChartGauge();
  
  }

  private createChartGauge(): void {
    const chart = Highcharts.chart('chart-gauge', {
      chart: {
        type: 'solidgauge',
      },
      title: {
        text: 'Gauge Chart',
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '85%'],
        size: '160%',
        background: {
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc',
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'], // red
        ],
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16,
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -25,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [{
        name: null,
        data: [40],
        dataLabels: {
          format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y}</span></div>',
        },
      }],
    } as any);

 
  }

 

  

  

//example

//example

  userDetails: any;

  public focus: any;
  public listTitles!: any[];
  public location: Location;
  estacion_mk: any;
  empresa_Id: any;
  currentEstacion: any;
  usuario_mk:any;

  currentUsuario: any;
  currentIndex = -1;

  station_mk: any

  stations = {

    id: "",
    nombreEstacion: ""

  }

  estaciones = {

    existe: false,
    dewpoint_c: "",
    pressure_mb: "",
    pressure_string: "",
    relative_humidity: "",
    temp_c: "",
    temperature_string: "",
    wind_degrees: "",
    wind_dir: "",
    wind_kt: "",
    davis_current_observation: {
      et_day: "",
      et_month: "",
      et_year: "",
      rain_day_in: "",
      rain_month_in: "",
      rain_year_in: "",
      solar_radiation: "",
      temp_day_high_f: "",
      temp_day_high_time: "",
      temp_day_low_f: "",
      temp_day_low_time: "",
      uv_index: ""}
  }


  usuario = {

      id: '',
      userName: '',
      contrasena: '',
      nombres: '',
      apellidos: '',
      estado: '',
      intentos: '',
      fechaCreacion: '',
      fechaModificacion: '',
      tipoDocumento: '',
      nroDocumento: '',
      correo: '',
      empresaId: '',
      empresa: {
        id: '',
        nombre: '',
        descripcion: '',
        estacion: [
          {
            id: '',
            nombreEstacion: '',
            latitud: '',
            longitud: '',
            usuario: '',
            clave: '',
            token: ''
          },
        
        ]
      },
      rolId: '',
      rol: {
        id: '',
        nombre: '',
        descripcion: '',
        estado: ''
      }


  }


  constructor(location: Location, public auth: AuthenticationService, public router: Router, private route: ActivatedRoute,public estacionService: EstacionService, private element: ElementRef,private service: UsersService,private estacion:EstacionService) {
    this.location = location
  }

  
  ngOnInit() {


  




    
    
    this.ObtenerEstaciones();
    this.getEstacion(1);
    this.getRol();
   
    const user = {
      id: 1

    };

    this.service.getUsuario(1).subscribe(
      res => {
        let headers = new Headers();

        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );


  

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



  ObtenerEstacionesDelUsuario() {
    this.service.getUsuario(1).subscribe(
      (data) => {
        this.usuario_mk = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList() {
    this.currentEstacion = null;
    this.currentIndex = -1;
  }

  setActiveTutorialSave(usuario: null, index: number) {
    this.currentEstacion= usuario;
    this.currentIndex = index;
  }

  getRol(){
    this.auth.getUsuarioPerfil()
  }

  getEstacion(id: number) {

    this.service.getUsuario(id)
      .subscribe(
        data => {
          this.currentEstacion = data.empresa.estacion;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }











 

}


