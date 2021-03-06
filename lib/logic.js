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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {com.sicmx.sicrentacab.setTaxiPropietarioTransaction} setTaxiPropietarioTransaction
 * @transaction
 */
async function setTaxiPropietarioTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.taxi.propietario;

    // Update the asset with the new value.
    tx.taxi.propietario = tx.propietario;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('com.sicmx.sicrentacab.Taxi');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.taxi);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('com.sicmx.sicrentacab', 'setTaxiPropietarioEvent');
    event.asset = tx.taxi;
    event.oldValue = oldValue;
    event.newValue = tx.propietario;
    emit(event);
}
