import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    Email: '',
    Password: ''
  }
  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/dashboard');
  }

  onSubmit(form: NgForm) { 
    debugger;
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Usuario o Contraseña Incorrecta.', 'Autenticación fallida.');
        else
          console.log(err);
      }
    );
  }
}