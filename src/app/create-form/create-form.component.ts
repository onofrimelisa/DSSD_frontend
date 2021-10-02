import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Continent, Country, SociedadAnonima, Socio, State } from '../interfaces';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
})
export class CreateFormComponent {
  sociedadAnonima: SociedadAnonima | undefined;
  socios: Socio[] = [];
  sociosValidos: boolean = false;
  continente: Continent | undefined;
  pais: Country | undefined;
  paisesForSociedad: Country[] = []

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
    estados: new FormControl(null),
    socios: this.sociosGroup
  })

  constructor(public graphqlService: GraphqlService) {

  }

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

  onSubmit() {
    if ((this.formGroup.invalid) || (!this.validPercentage())) {
      return
    }

    // obtengo apoderado
    let apoderado = this.socios.reduce((a, b) => {
      return (a.aportes > b.aportes ? a : b);
    })

    // agregar sociedad anónima
    this.sociedadAnonima = new SociedadAnonima(
      this.formGroup.value.nombre,
      this.formGroup.value.fecha,
      this.formGroup.value.domicilioLegal,
      this.formGroup.value.domicilioReal,
      this.formGroup.value.email,
      this.socios,
      apoderado,
      this.paisesForSociedad
    );

    console.log(this.sociedadAnonima);


    const formData = new FormData();
    formData.append('file', this.formGroup.get('estatuto')?.value);
    formData.append('sociedad_anonima', JSON.stringify(this.sociedadAnonima));

    console.log(JSON.stringify(this.sociedadAnonima));

    /*this.http.post('http://localhost:8001/upload.php', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })*/

    this.formGroup.reset()
  }

  removeSocio(socio: Socio) {

  }

  removePais(pais: Country) {

  }

  selectContinent(continente: Continent) {
    this.continente = continente;

  }

  selectCountry(pais: Country) {
    this.pais = pais
  }

  addPaisForSociedad() {
    if (this.pais) {
      if (this.formGroup.controls.estados.value) {
        let newPais = new Country(this.pais.code, this.pais.name, this.pais.languages, this.formGroup.controls.estados.value, this.pais.continent)
        this.paisesForSociedad.push(newPais)
        this.formGroup.controls.estados.reset()

        return
      }
      this.paisesForSociedad.push(this.pais)
    }
  }

}
