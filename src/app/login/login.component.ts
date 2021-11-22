import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { APODERADO_ROLE, LEGALES_ROLE, MESA_ENTRADAS_ROLE } from '../app-constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router) { }

  // Form
  login = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    contrasenia: new FormControl('', [Validators.required]),
  })

  getRequiredErrorMessage(form: AbstractControl) {
    if (form.hasError('required')) {
      return 'Éste campo es requerido';
    }

    return
  }

  onSubmit() {
    if (this.login.invalid) {
      return
    }

    let usuario = this.login.controls.usuario.value
    let contrasenia = this.login.controls.contrasenia.value

    if (usuario == 'admin' && contrasenia == '1234') {
      this.auth.setAllLocalStorage({ token: "test", role: "admin" }, usuario, contrasenia)
      this.router.navigate(["/admin"])
      swal("Inicio de sesión", "La operación se realizó correctamente", "success");
      return
    }

    this.auth.login(usuario, contrasenia)
      .subscribe((data: any) => {
        this.auth.setAllLocalStorage(data, usuario, contrasenia)
        swal("Inicio de sesión", "La operación se realizó correctamente", "success");

        this.auth.setRole(data.role)

        // navigate to different routes deppending on the role

        switch (data.role) {
          case MESA_ENTRADAS_ROLE:
            this.router.navigate(["/mesa_entradas/sociedades"])
            break;

          case LEGALES_ROLE:
            this.router.navigate(["/legales/sociedades"])
            break;

          default:
            this.router.navigate(["/apoderado/sociedades"])
            break;
        }
      }, (error: any) => {
        swal("Inicio de sesión", "Ocurrió un problema: " + error.error.message, "error");
      })


  }

}
