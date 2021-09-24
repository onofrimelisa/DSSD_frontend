import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Socio, SociedadAnonima } from '../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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



    this.login.reset();
  }

}
