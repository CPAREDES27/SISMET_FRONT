import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Map, marker, tileLayer } from "leaflet";
import { AuthenticationService } from "src/app/services/authentication.service";
import { EstacionService } from "src/app/services/estacion.service";
import { UsersService } from "src/app/shared/user.service";
@Component({
  selector: "app-view-map",
  templateUrl: "./view-map.component.html",
  styleUrls: ["./view-map.component.scss"],
})
export class ViewMapComponent implements OnInit {
  user: any;
  currentEstacion: any;
  id: any;
  estaciones: any;

  constructor(
    public auth: AuthenticationService,
    private service: UsersService,
    public estacionService: EstacionService
  ) {}

  ngOnInit(): void {
    this.getAuthUsuario();
    this.getEstacion(this.user.Id);
    this.getUbicacion(this.user.Id);
  }

  getAuthUsuario() {
    this.user = this.auth.getUsuarioPerfil();
    console.log(this.user);
  }

  getEstacion(id: number) {
    this.service.getUsuario(id).subscribe(
      (data) => {
        this.currentEstacion = data.empresa.estacion;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUbicacion(id: number) {
    this.service.getUsuario(id).subscribe(
      (data) => {
        this.currentEstacion = data.empresa.estacion;
        console.log(data);
        const map = new Map("map").setView([51.505, -0.09], 13);
        tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const markerItem = marker([
          this.currentEstacion[0].latitud,
          this.currentEstacion[0].longitud,
        ])
          .addTo(map)
          .bindPopup(this.currentEstacion[0].nombreEstacion);

        map.fitBounds([
          [markerItem.getLatLng().lat, markerItem.getLatLng().lng],
        ]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

 
}
