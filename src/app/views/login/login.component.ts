import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "src/app/shared/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  forma!: FormGroup;
  
  usuario: string | undefined;
  password: string | undefined;

  constructor(
    public toastr: ToastrService,
    public userService: UsersService,
    public router: Router
  ) {}

  ngOnInit() {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") != null)
      this.router.navigateByUrl("/dashboard");
  }

  setForm() {

    this.setForm();

    this.forma = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {

    
 
    

    const user = { usuario: this.usuario, password: this.password };
    this.userService.login(user).subscribe(
      (res: any) => {
        if (res.value.message != "") 
        {
          Swal.fire({
            title: '',
            text: res.value.message,
            icon: 'warning',
            confirmButtonColor: '#083E5E',
            confirmButtonText: 'Aceptar'
          })
        }
        else {
          localStorage.setItem("token", res.value.authToken);
          this.router.navigateByUrl("/dashboard");
        }
      },

      
      (error) => {
        if (error.status == 400)
        Swal.fire('Completar los Campos.');
        
        else console.log(error);
      }
    );
  }
}
