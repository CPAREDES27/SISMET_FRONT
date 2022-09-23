import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Map, marker, tileLayer } from "leaflet";
import { AuthenticationService } from "src/app/services/authentication.service";
import { EstacionService } from "src/app/services/estacion.service";
import { UsersService } from "src/app/shared/user.service";
import Swal from 'sweetalert2';
@Component({
  selector: "app-view-map",
  templateUrl: "./view-map.component.html",
  styleUrls: ["./view-map.component.scss"],
})
export class ViewMapComponent implements OnInit {
  user: any;
  currentEstacion: any = [];
  id: any;
  estaciones: any;
  carga:boolean=false;
  map: any;
  estacion = {
    id: "",
  };
  datoEnviar: number = 0;
  constructor(
    public router: Router,
    public auth: AuthenticationService,
    private service: UsersService,
    public estacionService: EstacionService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null || localStorage.getItem("token") === undefined)
    this.router.navigateByUrl("/login");
    this.getAuthUsuario();
    


    if (this.user.rol == 2) {
      this.getUbicacion(this.user.Id);
      this.getEstacion(this.user.Id);
    } else {
      this.ObtenerEstaciones();
    }
  }

  ngAfterViewInit(): void {
    this.map = new Map("map");
  }

  getAuthUsuario() {
    this.user = this.auth.getUsuarioPerfil();
  }

  ObtenerEstaciones() {
    this.estacionService.getAll().subscribe(
      (data) => {
        
        this.currentEstacion = data;
        this.mostrarmapa(
          data[0].latitud,
          data[0].longitud,
          data[0].nombreEstacion
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

  getEstacion(id: number) {
    this.carga=true;
    this.service.getUsuario(this.user.Id).subscribe(
      (data) => {
        this.currentEstacion = data.empresa.estacion;
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

  mostrarmapa(latitud: string, longitud: string, nombre: string) {
    var lati = Number(latitud);
    var long = Number(longitud);
    if(this.map){
      this.map.remove();
      this.map = new Map("map");
    }
    this.map.setView([latitud, longitud], 13);
 
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 14,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    var markerItem = null;
     markerItem = marker([lati, long])
      .bindTooltip(nombre + "<br/>" + "Latitud: " + "<strong>" + latitud + "</strong>" + "<br/>" + "Longitud: " + "<strong>" + longitud + "<strong>")
      .addTo(this.map)
      .on("click", (ev) => {
        this.router.navigateByUrl("/datos-map/" + this.datoEnviar);
      });
      
    
    // console.log("hola",markerItem);
    // this.map.fitBounds([
    //   [markerItem.getLatLng().lat, markerItem.getLatLng().lng],
    // ]);
  }
  getUbicacion(id: number) {
    this.carga=true;
    this.service.getUsuario(this.user.Id).subscribe(
      (data) => {
        this.datoEnviar = data.empresa.estacion[0].id;
        this.carga=false;
        this.mostrarmapa(
          data.empresa.estacion[0].latitud,
          data.empresa.estacion[0].longitud,
          data.empresa.estacion[0].nombreEstacion
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

  getUbicacionCombo(event: any) {
    var estacion = event.target["value"];
    this.datoEnviar = Number(estacion);
    let longitud;
    let latitude;
    let nombre;
    for (var i = 0; i < this.currentEstacion.length; i++) {
      if (this.currentEstacion[i].id == estacion) {
        latitude = this.currentEstacion[i].latitud;
        longitud = this.currentEstacion[i].longitud;
        nombre = this.currentEstacion[i].nombreEstacion;
      }
    }
    this.mostrarmapa(latitude, longitud, nombre);
  }
}
