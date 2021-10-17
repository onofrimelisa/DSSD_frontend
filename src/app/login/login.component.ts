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

    this.auth.login(usuario, contrasenia)
      .subscribe((data: any) => {
        this.auth.setLocalStorage("token", data.token)
        this.auth.setLocalStorage("sessionId", data.sessionId)
        this.auth.setLocalStorage("role", data.role)
        this.auth.setLocalStorage("username", usuario)

        swal("Inicio de sesión", "La operación se realizó correctamente", "success");

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
      }, (error) => {
        swal("Inicio de sesión", "Ocurrió un problema", "error");
      })


  }

}
