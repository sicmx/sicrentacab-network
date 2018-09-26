import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Persona} from './composer.base';
// export namespace com.sicmx.sicrentacab{
   export abstract class DetallesDelVehiculo {
      marca: string;
      modelo: string;
      color: string;
      niv: string;
      placas: string;
      subModelo: string;
      version: string;
      tipoCarroceria: string;
      cargaAdmitida: number;
      cilindros: number;
      co2: number;
      tipodeCombustible: string;
      numerodeAcientos: number;
      numerodelugaresParados: number;
      numerodeEjes: string;
      categoria: string;
      potenciaMaxima: number;
      numerodeMotor: string;
   }
   export enum StatusDelVehiculo {
      RENTADO,
      INACTIVO,
      TALLER,
      PERDIDA,
   }
   export class Propietario extends Participant {
      IdPropietario: string;
      persona: Persona;
   }
   export class Taxista extends Participant {
      IdTaxista: string;
      persona: Persona;
   }
   export class Taxi extends Asset {
      niv: string;
      detallesdelVehiculo: DetallesDelVehiculo;
      statusdelVehiculo: StatusDelVehiculo;
      propietario: Propietario;
      taxista: Taxista;
   }
   export class Contrato extends Asset {
      IdContrato: string;
      taxista: Taxista;
      taxi: Taxi;
   }
   export abstract class taxiTrasaccion extends Transaction {
      taxi: Taxi;
   }
   export class setTaxiPropietarioTransaction extends taxiTrasaccion {
      propietario: Propietario;
   }
// }
