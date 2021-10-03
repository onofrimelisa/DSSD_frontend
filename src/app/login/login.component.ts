import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';


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
        this.auth.setLocalStorage(data.token)
        swal("Inicio de sesión", "La operación se realizó correctamente", "success");
        this.router.navigate(["/registro"])
      }, (error) => {
        swal("Inicio de sesión", "Ocurrió un problema", "error");
      })


  }

}
