import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/user.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userDetails: any;

  public focus: any;
  public listTitles!: any[];
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router,private service: UsersService) {
    this.location = location
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);

    
    const user = {
      id: 1

    };

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
