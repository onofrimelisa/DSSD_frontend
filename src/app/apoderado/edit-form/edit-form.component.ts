import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PRIVATE_BACKEND_URL } from 'src/app/app-constants';
import { SociedadAnonima } from 'src/app/interfaces';
import { UpdateSociedadAnonima } from 'src/app/interfaces/SociedadAnonima';
import { ApoderadoService } from 'src/app/services/apoderado.service';
import { PublicService } from 'src/app/services/public.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  sociedadAnonima: SociedadAnonima | undefined;
  updateSociedadAnonima: UpdateSociedadAnonima | undefined;
  loading: boolean = true
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nombre: new FormControl('', [Validators.required]),
    domicilioReal: new FormControl('', [Validators.required]),
    domicilioLegal: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
  })

  constructor(private route: ActivatedRoute, private apoderado: ApoderadoService, private router: Router, private http: HttpClient, private _public: PublicService, private _apoderado: ApoderadoService) {

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    const sociedadId = Number(routeParams.get('id'))

    this._public.getInfoPublicaSociedad(sociedadId).subscribe((data: any) => {
      this.sociedadAnonima = data
      console.log(this.sociedadAnonima)
      this.loading = false
    })
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

  onSubmit() {
    if (this.formGroup.invalid) {
      return
    }

    // editar sociedad anónima
    this.updateSociedadAnonima = new UpdateSociedadAnonima(
      this.formGroup.value.nombre,
      this.formGroup.value.fecha,
      this.formGroup.value.domicilioLegal,
      this.formGroup.value.domicilioReal,
      this.formGroup.value.email,
    );

    console.log(this.updateSociedadAnonima)

    this.http.put(PRIVATE_BACKEND_URL + "/sociedad/" + this.sociedadAnonima?.id, this.updateSociedadAnonima)
      .subscribe((res) => {
        swal("Edición de sociedad anónima", "La operación se realizó correctamente", "success");
        this.apoderado.getSociedades()
        this.router.navigate(["/apoderado/sociedades"])
      }, (error) => {
        console.log(error)
        swal("Edición de sociedad anónima", "Ocurrió un problema", "error");
      })
  }

}
