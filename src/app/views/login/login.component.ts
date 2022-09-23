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
  carga: boolean = false;
  spinnerOn: string = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
  spinnerOff: string = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="false" hidden></span>';
  constructor(
    public toastr: ToastrService,
    public userService: UsersService,
    public router: Router
  ) { }


  ngOnInit() {

    let spin = document.getElementById('spin1') as InnerHTML;
    spin.innerHTML = this.spinnerOff;
    localStorage.clear();
  }

  setForm() {

    this.setForm();

    this.forma = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {


    let spin = document.getElementById('spin1') as InnerHTML;
    spin.innerHTML = this.spinnerOn;


    const user = { usuario: this.usuario, password: this.password };
    this.userService.login(user).subscribe(
      (res: any) => {
        if (res.value.message != "") {
          Swal.fire({
            title: '',
            text: res.value.message,
            icon: 'warning',
            confirmButtonColor: '#083E5E',
            confirmButtonText: 'Aceptar'
          })
          spin.innerHTML = this.spinnerOff;
        }
        else {
          localStorage.setItem("token", res.value.authToken);
          this.router.navigateByUrl("/dashboard");
          spin.innerHTML = this.spinnerOff;
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
