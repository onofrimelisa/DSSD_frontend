import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESA_ENTRADAS_ROLE, LEGALES_ROLE, APODERADO_ROLE } from '../app-constants';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout()
    swal("Cierre de sesión", "La operación se realizó correctamente", "success");
    this.router.navigate(["/login"])
  }

  goToHome() {
    switch (this.auth.role) {
      case MESA_ENTRADAS_ROLE:
        this.router.navigate(["/mesa_entradas/sociedades"])
        break;

      case LEGALES_ROLE:
        this.router.navigate(["/legales/sociedades"])
        break;

      case APODERADO_ROLE:
        this.router.navigate(["/apoderado/sociedades"])
        break;

      case "":
        this.router.navigate(["/admin"])
        break;

      default:
        console.log("ROLE: ", this.auth.role)
        this.router.navigate(["/admin"])
        break;
    }
  }

}
