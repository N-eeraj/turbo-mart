import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { TemperatureUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

/**
 * Convert a temperature value from one unit to another.
 * Base unit: Celsius
 */
export const convertTemperature: ConversionFn<MeasurementType.TEMPERATURE> = (from, to, value) => {
  let celsiusValue: number

  // Step 1: convert from `from` unit to Celsius
  switch (from) {
    case TemperatureUnits.CELSIUS:
      celsiusValue = value
      break
    case TemperatureUnits.FAHRENHEIT:
      celsiusValue = (value - 32) * (5 / 9)
      break
    case TemperatureUnits.KELVIN:
      celsiusValue = value - 273.15
      break
    default:
      throw new Error(`Unsupported temperature unit: ${from}`)
  }

  // Step 2: convert from Celsius to `to` unit
  switch (to) {
    case TemperatureUnits.CELSIUS:
      return celsiusValue
    case TemperatureUnits.FAHRENHEIT:
      return celsiusValue * (9 / 5) + 32
    case TemperatureUnits.KELVIN:
      return celsiusValue + 273.15
    default:
      throw new Error(`Unsupported temperature unit: ${to}`)
  }
}

const TEMPERATURE_UNITS: Record<TemperatureUnits, MeasurementUnitData<TemperatureUnits>> = {
  [TemperatureUnits.CELSIUS]: {
    name: "Degree Celsius",
    symbol: "°C",
    convertTo: (unit: TemperatureUnits, value: number): number => convertTemperature(TemperatureUnits.CELSIUS, unit, value),
  },
  [TemperatureUnits.FAHRENHEIT]: {
    name: "Degree Fahrenheit",
    symbol: "°F",
    convertTo: (unit: TemperatureUnits, value: number): number => convertTemperature(TemperatureUnits.FAHRENHEIT, unit, value),
  },
  [TemperatureUnits.KELVIN]: {
    name: "Kelvin",
    symbol: "K",
    convertTo: (unit: TemperatureUnits, value: number): number => convertTemperature(TemperatureUnits.KELVIN, unit, value),
  },
} as const

export default TEMPERATURE_UNITS
