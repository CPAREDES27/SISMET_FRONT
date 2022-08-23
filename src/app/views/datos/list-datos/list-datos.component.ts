import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list-datos',
  templateUrl: './list-datos.component.html',
  styleUrls: ['./list-datos.component.scss']
})
export class ListDatosComponent implements OnInit {
  userDetails: any;

  constructor(private service: UsersService) { }


  ngOnInit() {

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

}
