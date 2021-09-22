import { Socio } from "./Socio";

export class SociedadAnonima {
  constructor(
    public id: number,
    public nombre: string,
    public fechaCreacion: string,
    public estatutoConformacion: string,
    public domicilioLegal: string,
    public domicilioReal: string,
    public correoElectronico: string,
    public socios: Socio[]
  ) { }
}