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
    estatuto: new FormControl(null, [Validators.required]),
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
    let newSocio = new Socio(this.sociosGroup.value.nombre, this.sociosGroup.value.apellido, this.sociosGroup.value.porcentaje);
    this.socios?.push(newSocio);

    this.sociosValidos = this.validPercentage() ? true : false;
  }

  accumPercentage() {
    return this.socios.reduce((acc, socio) => {
      return acc + socio.aportes;
    }, 0);
  }

  validPercentage() {
    return (this.accumPercentage() == 100);
  }

  onFileChange(event: any) {
    console.log(event);

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        estatuto: file
      });
    }
    console.log(this.formGroup);

  }

  onSubmit() {
    if ((this.formGroup.invalid) || (!this.validPercentage())) {
      return
    }

    // agregar sociedad anónima
    this.sociedadAnonima = new SociedadAnonima(
      this.formGroup.value.nombre,
      this.formGroup.value.fecha,
      this.formGroup.value.domicilioLegal,
      this.formGroup.value.domicilioReal,
      this.formGroup.value.email,
      this.socios
    );

    const formData = new FormData();
    formData.append('file', this.formGroup.get('estatuto')?.value);

    console.log(formData);

    /*this.http.post('http://localhost:8001/upload.php', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })*/

    this.formGroup.reset();
  }

  removeSocio(socio: Socio) {

  }

}
