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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { TaxiComponent } from './Taxi/Taxi.component';
import { ContratoComponent } from './Contrato/Contrato.component';

import { PropietarioComponent } from './Propietario/Propietario.component';
import { TaxistaComponent } from './Taxista/Taxista.component';

import { setTaxiPropietarioTransactionComponent } from './setTaxiPropietarioTransaction/setTaxiPropietarioTransaction.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Taxi', component: TaxiComponent },
  { path: 'Contrato', component: ContratoComponent },
  { path: 'Propietario', component: PropietarioComponent },
  { path: 'Taxista', component: TaxistaComponent },
  { path: 'setTaxiPropietarioTransaction', component: setTaxiPropietarioTransactionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
