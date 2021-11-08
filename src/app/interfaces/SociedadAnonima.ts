import { Country, State } from ".";
import { Socio } from "./Socio";

export class SociedadAnonima {
  id: number | undefined;
  expediente: any

  constructor(
    public nombre: string,
    public fechaCreacion: Date,
    public domicilioLegal: string,
    public domicilioReal: string,
    public correoElectronico: string,
    public socios: Socio[],
    public apoderado: Socio,
    public paises: Country[],
    public role: string,
    public username: string
  ) { }
}