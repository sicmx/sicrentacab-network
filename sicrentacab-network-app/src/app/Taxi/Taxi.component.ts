/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TaxiService } from './Taxi.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-taxi',
  templateUrl: './Taxi.component.html',
  styleUrls: ['./Taxi.component.css'],
  providers: [TaxiService]
})
export class TaxiComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  niv = new FormControl('', Validators.required);
  detallesdelVehiculo = new FormControl('', Validators.required);
  statusdelVehiculo = new FormControl('', Validators.required);
  propietario = new FormControl('', Validators.required);
  taxista = new FormControl('', Validators.required);

  constructor(public serviceTaxi: TaxiService, fb: FormBuilder) {
    this.myForm = fb.group({
      niv: this.niv,
      detallesdelVehiculo: this.detallesdelVehiculo,
      statusdelVehiculo: this.statusdelVehiculo,
      propietario: this.propietario,
      taxista: this.taxista
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceTaxi.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'com.sicmx.sicrentacab.Taxi',
      'niv': this.niv.value,
      'detallesdelVehiculo': this.detallesdelVehiculo.value,
      'statusdelVehiculo': this.statusdelVehiculo.value,
      'propietario': this.propietario.value,
      'taxista': this.taxista.value
    };

    this.myForm.setValue({
      'niv': null,
      'detallesdelVehiculo': null,
      'statusdelVehiculo': null,
      'propietario': null,
      'taxista': null
    });

    return this.serviceTaxi.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'niv': null,
        'detallesdelVehiculo': null,
        'statusdelVehiculo': null,
        'propietario': null,
        'taxista': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'com.sicmx.sicrentacab.Taxi',
      'detallesdelVehiculo': this.detallesdelVehiculo.value,
      'statusdelVehiculo': this.statusdelVehiculo.value,
      'propietario': this.propietario.value,
      'taxista': this.taxista.value
    };

    return this.serviceTaxi.updateAsset(form.get('niv').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceTaxi.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceTaxi.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'niv': null,
        'detallesdelVehiculo': null,
        'statusdelVehiculo': null,
        'propietario': null,
        'taxista': null
      };

      if (result.niv) {
        formObject.niv = result.niv;
      } else {
        formObject.niv = null;
      }

      if (result.detallesdelVehiculo) {
        formObject.detallesdelVehiculo = result.detallesdelVehiculo;
      } else {
        formObject.detallesdelVehiculo = null;
      }

      if (result.statusdelVehiculo) {
        formObject.statusdelVehiculo = result.statusdelVehiculo;
      } else {
        formObject.statusdelVehiculo = null;
      }

      if (result.propietario) {
        formObject.propietario = result.propietario;
      } else {
        formObject.propietario = null;
      }

      if (result.taxista) {
        formObject.taxista = result.taxista;
      } else {
        formObject.taxista = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'niv': null,
      'detallesdelVehiculo': null,
      'statusdelVehiculo': null,
      'propietario': null,
      'taxista': null
      });
  }

}
