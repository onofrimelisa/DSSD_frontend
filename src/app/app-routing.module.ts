import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisRegistrosComponent } from './apoderado/mis-registros/mis-registros.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { HomeComponent } from './home/home.component';
import { EstatutoSociedadesComponent } from './legales/estatuto-sociedades/estatuto-sociedades.component';
import { LoginComponent } from './login/login.component';
import { SociedadesComponent } from './mesa-entradas/sociedades/sociedades.component';
import { PublicSociedadComponent } from './public-sociedad/public-sociedad.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: CreateFormComponent },
  { path: 'apoderado/sociedades', component: MisRegistrosComponent },
  { path: 'mesa_entradas/sociedades', component: SociedadesComponent },
  { path: 'legales/sociedades', component: EstatutoSociedadesComponent },
  { path: 'public/sociedad', component: PublicSociedadComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
