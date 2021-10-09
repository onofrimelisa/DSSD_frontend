import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisRegistrosComponent } from './apoderado/mis-registros/mis-registros.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: CreateFormComponent },
  { path: 'apoderado/mis_registros', component: MisRegistrosComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
