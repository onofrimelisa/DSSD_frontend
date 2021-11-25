import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material improts
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ChartsModule } from 'ng2-charts';

// Apollo Client
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

// Components
import { AppComponent } from './app.component';
import { CreateFormComponent } from './apoderado/create-form/create-form.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { GRAPHQL_API_URL, PRIVATE_BACKEND_URL } from './app-constants';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { MisRegistrosComponent } from './apoderado/mis-registros/mis-registros.component';
import { SociedadesComponent } from './mesa-entradas/sociedades/sociedades.component';
import { EstatutoSociedadesComponent } from './legales/estatuto-sociedades/estatuto-sociedades.component';
import { PublicSociedadComponent } from './public-sociedad/public-sociedad.component';
import { QrCodeModule } from 'ng-qrcode';
import { AdministracionComponent } from './administracion/administracion.component';
import { EditFormComponent } from './apoderado/edit-form/edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponent,
    ToolbarComponent,
    LoginComponent,
    MisRegistrosComponent,
    SociedadesComponent,
    EstatutoSociedadesComponent,
    PublicSociedadComponent,
    AdministracionComponent,
    EditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    QrCodeModule,
    ChartsModule
  ],
  exports: [
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: GRAPHQL_API_URL,
          }),
        };
      },
      deps: [HttpLink],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
