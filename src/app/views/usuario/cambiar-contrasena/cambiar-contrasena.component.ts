import { Component, Inject, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { UsuarioService } from "src/app/services/usuario.service";
import Swal from "sweetalert2";
import { map } from "rxjs/operators";

@Component({
  selector: "app-cambiar-contrasena",
  templateUrl: "./cambiar-contrasena.component.html",
  styleUrls: ["./cambiar-contrasena.component.scss"],
})
export class CambiarContrasenaComponent implements OnInit {
  usuarios_mk: any;
  currentUsuario: any;
  currentIndex = -1;
  userName = "";
  message = "";
  registrationForm: FormGroup;
  comparePassword: boolean | undefined;
  registrationMessage: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<CambiarContrasenaComponent>,
    private fb: FormBuilder,
    public _usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public user: any,
    public router: Router
  ) {
    this.registrationForm = fb.group({
      password: [""],
      confirmPassword: [""],
    });
  }

  get formControls() {
    return this.registrationForm.controls;
  }

  ngOnInit() {
    this.registrationForm.valueChanges
      .pipe(
        map((controls) => {
          return (
            this.formControls.confirmPassword.value ===
            this.formControls.password.value
          );
        })
      )
      .subscribe((passwordState) => {
        this.comparePassword = passwordState;
      });

    this.getUsuario(this.user.id);
  }

  getUsuario(id: string | null) {
    this._usuarioService.get(id).subscribe(
      (data) => {
        this.currentUsuario = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClickOK() {
    this.dialogRef.close();
  }

  updateUsuario() {
    if (
      this.formControls.confirmPassword.value !=
      this.formControls.password.value
    ) {
      Swal.fire({
        title: "Atención!",
        text: "Las contraseñas no son iguales. Debe repetir la contraseña.",
        icon: "warning",
        confirmButtonColor: "#083E5E",
        confirmButtonText: "Aceptar",
      });
    } else {
      this._usuarioService
        .update(this.currentUsuario.id, this.currentUsuario)
        .subscribe(
          (res: any) => {
            if (res.value.mensaje != "") {
              Swal.fire({
                title: "",
                text: "La contraseña ha sido actualizada.",
                icon: "success",
                confirmButtonColor: "#083E5E",
                confirmButtonText: "Aceptar",
                timer: 6000,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialogRef.close();
                }
              });
            }
          },

          (error) => {
            if (error.status == 400)
              Swal.fire("¡Ha ocurrido un error!", error, "error");
            else console.log(error);
          }
        );
    }
  }
}
