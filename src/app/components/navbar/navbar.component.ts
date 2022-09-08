import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { UsersService } from "src/app/shared/user.service";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  userDetails: any;
  user: any;

  public focus: any;
  public listTitles!: any[];
  public location: Location;
  constructor(
    location: Location,
    public auth: AuthenticationService,
    private element: ElementRef,
    private router: Router,
    private service: UsersService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.getAuthUsuario();
    this.getInfoUsuario();
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
  }

  getInfoUsuario() {
    this.service.getUsuario(this.user.Id).subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAuthUsuario() {
    this.user = this.auth.getUsuarioPerfil();
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
  }
}
