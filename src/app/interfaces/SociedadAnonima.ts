import { Socio } from "./Socio";

export class SociedadAnonima {
  id: number | undefined;

  constructor(
    public nombre: string,
    public fechaCreacion: Date,
    public estatutoConformacion: string,
    public domicilioLegal: string,
    public domicilioReal: string,
    public correoElectronico: string,
    public socios: Socio[]
  ) { }
}