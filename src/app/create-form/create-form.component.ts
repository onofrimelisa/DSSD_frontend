import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { SociedadAnonima } from '../interfaces';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
})
export class CreateFormComponent {

  sociedadAnonima: SociedadAnonima | undefined;

  // Form
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    domicilioReal: new FormControl('', [Validators.required]),
    domicilioLegal: new FormControl('', [Validators.required]),
  })

  getEmailErrorMessage(form: AbstractControl) {
    let requiredErrorMessage = this.getRequiredErrorMessage(form);

    if (requiredErrorMessage != undefined) {
      return requiredErrorMessage
    }

    return this.formGroup.controls.email.hasError('email') ? 'Email inválido' : '';
  }

  getRequiredErrorMessage(form: AbstractControl) {
    console.log(form);

    if (form.hasError('required')) {
      return 'Éste campo es requerido';
    }

    return
  }

  onSubmit() {

  }

}
