import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Continent, Country, SociedadAnonima, Socio, State } from '../../interfaces';
import { GraphqlService } from '../../services/graphql.service';
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
import { PRIVATE_BACKEND_URL } from '../../app-constants';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApoderadoService } from 'src/app/services/apoderado.service';

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
  file: File | undefined

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

  constructor(
    public graphqlService: GraphqlService,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private apoderado: ApoderadoService
  ) { }

  getEmailErrorMessage(form: AbstractControl) {
    let requiredErrorMessage = this.getRequiredErrorMessage(form);

    if (requiredErrorMessage != undefined) {
      return requiredErrorMessage
    }

    return this.formGroup.controls.email.hasError('email') ? 'Email inv??lido' : '';
  }

  getRequiredErrorMessage(form: AbstractControl) {
    if (form.hasError('required')) {
      return '??ste campo es requerido';
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

    // agregar sociedad an??nima
    this.sociedadAnonima = new SociedadAnonima(
      this.formGroup.value.nombre,
      this.formGroup.value.fecha,
      this.formGroup.value.domicilioLegal,
      this.formGroup.value.domicilioReal,
      this.formGroup.value.email,
      this.socios,
      apoderado,
      this.paisesForSociedad,
      this.auth.getLocalStorage("role"),
      this.auth.getLocalStorage("username")
    );

    const formData = new FormData();
    if (this.file) {
      formData.append('estatuto', this.file);
    }
    formData.append('sociedad_anonima', JSON.stringify(this.sociedadAnonima));

    console.log(this.sociedadAnonima)

    this.http.post(PRIVATE_BACKEND_URL + "/sociedad", formData)
      .subscribe((res) => {
        swal("Registro de sociedad an??nima", "La operaci??n se realiz?? correctamente", "success");
        this.apoderado.getSociedades()
        this.router.navigate(["/apoderado/sociedades"])
      }, (error) => {
        console.log(error)
        swal("Registro de sociedad an??nima", "Ocurri?? un problema", "error");
      })
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

  onFileSelect(input: any) {
    console.log(input.files);
    if (input.files && input.files[0]) {
      this.file = input.files[0]
    }
  }

}
