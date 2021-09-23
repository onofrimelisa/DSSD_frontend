import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { SociedadAnonima, Socio } from '../interfaces';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
})
export class CreateFormComponent {

  sociedadAnonima: SociedadAnonima | undefined;
  socios: Socio[] = [];
  sociosValidos: boolean = false;

  // Form
  sociosGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    porcentaje: new FormControl('', [Validators.required]),
  })

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nombre: new FormControl('', [Validators.required]),
    domicilioReal: new FormControl('', [Validators.required]),
    domicilioLegal: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    estatuto: new FormControl('', [Validators.required]),
    socios: this.sociosGroup
  })

  getEmailErrorMessage(form: AbstractControl) {
    let requiredErrorMessage = this.getRequiredErrorMessage(form);

    if (requiredErrorMessage != undefined) {
      return requiredErrorMessage
    }

    return this.formGroup.controls.email.hasError('email') ? 'Email inválido' : '';
  }

  getRequiredErrorMessage(form: AbstractControl) {
    if (form.hasError('required')) {
      return 'Éste campo es requerido';
    }

    return
  }

  addSocio() {
    let newSocio = new Socio(this.sociosGroup.value.nombre, this.sociosGroup.value.apellido, this.sociosGroup.value.aportes);
    this.socios?.push(newSocio);
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return
    }

    // agregar socios


    // agregar sociedad anónima
    this.sociedadAnonima = new SociedadAnonima(this.formGroup.value.email, this.formGroup.value.fecha, this.formGroup.value.estatuto, this.formGroup.value.domicilioLegal, this.formGroup.value.domicilioReal, this.formGroup.value.email, this.socios)

    console.log(this.sociedadAnonima);

  }

}
