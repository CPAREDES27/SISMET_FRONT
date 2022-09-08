import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "src/app/services/usuario.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: 'app-recuperar-passoword',
  templateUrl: './recuperar-passoword.component.html',
  styleUrls: ['./recuperar-passoword.component.scss']
})
export class RecuperarPassowordComponent implements OnInit {

  dato: string | undefined;
  submitted = false;

  constructor(public userService: UsuarioService, public router: Router,) { }


  ngOnInit(): void {
  }

  recuperar() {
    if (this.dato == '' || this.dato == undefined) {
      Swal.fire({
        title: 'Atención!',
        text: "Debe completar el campo solicitado.",
        icon: 'warning',
        confirmButtonColor: '#083E5E',
        confirmButtonText: 'Aceptar'
      })
    }
    else {
      const contrasena = {
        dato: this.dato,
      };


      this.userService.recuperar(contrasena).subscribe(

        (res: any) => {

          if (res.message != '') {
            Swal.fire({
              title: '',
              text: "Se ha enviado la contraseña satisfactoriamente. Favor de verificar y volver a la iniciar sesión.",
              icon: 'success',
              confirmButtonColor: '#083E5E',
              confirmButtonText: 'Aceptar',
              timer: 6000
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl("/login");

              }
            })

          }
        },
        (error) => {
          if (error.status == 400) {
            Swal.fire({
              title: '',
              text: error.error,
              icon: 'warning',
              confirmButtonColor: '#083E5E',
              confirmButtonText: 'Aceptar'
            })
          }

          if (error.status == 401) {
            Swal.fire({
              title: '',
              text: 'Correo inválido.',
              icon: 'warning',
              confirmButtonColor: '#083E5E',
              confirmButtonText: 'Aceptar'
            })
          }


        },

      );
    }



  }

}
