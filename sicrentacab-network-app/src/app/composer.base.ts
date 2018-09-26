import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace composer.base{
   export enum Genero {
      MASCULINO,
      FEMENINO,
   }
   export abstract class Persona extends Participant {
      titulo: string;
      nombres: string;
      apellidoPaterno: string;
      apellidoMaterno: string;
      genero: Genero;
      nacionalidad: string;
      detallesContacto: DetallesContacto;
      detallesNacimiento: DetallesNacimiento;
   }
   export abstract class DetallesContacto {
      correo: string;
      telefonoMobil: string;
      telefonoCasa: string;
      direccion: Direccion;
   }
   export abstract class DetallesNacimiento {
      fechadeNacimiento: Date;
      lugardeNacimiento: string;
   }
   export abstract class Direccion {
      ciudad: string;
      estado: string;
      pais: string;
      localidad: string;
      municipio: string;
      calle: string;
      numeroInterior: string;
      numeroExterior: string;
      codigoPostal: string;
      apartadoPostal: string;
   }
// }
