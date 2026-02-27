import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { FuelEconomyUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to kilometer per liter
const FUEL_ECONOMY_CONVERSION_FACTORS: Record<FuelEconomyUnits, number> = {
  [FuelEconomyUnits.KILOMETER_PER_LITER]: 1,
  [FuelEconomyUnits.LITER_PER_100_KILOMETERS]: 1 / 100, // 1 L/100km ≈ 0.01 km/L
  [FuelEconomyUnits.MILE_PER_GALLON]: 0.425144,          // 1 MPG ≈ 0.425144 km/L
}

/**
 * Convert a fuel economy value from one unit to another.
 */
export const convertFuelEconomy: ConversionFn<MeasurementType.FUEL_ECONOMY> = (from, to, value) => {
  const fromFactor = FUEL_ECONOMY_CONVERSION_FACTORS[from]
  const toFactor = FUEL_ECONOMY_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const FUEL_ECONOMY_UNITS: Record<FuelEconomyUnits, MeasurementUnitData<FuelEconomyUnits>> = {
  [FuelEconomyUnits.KILOMETER_PER_LITER]: {
    name: "Kilometer per liter",
    symbol: "km/L",
    convertTo: (unit: FuelEconomyUnits, value: number): number => convertFuelEconomy(FuelEconomyUnits.KILOMETER_PER_LITER, unit, value),
  },
  [FuelEconomyUnits.LITER_PER_100_KILOMETERS]: {
    name: "Liter per 100 kilometers",
    symbol: "L/100km",
    convertTo: (unit: FuelEconomyUnits, value: number): number => convertFuelEconomy(FuelEconomyUnits.LITER_PER_100_KILOMETERS, unit, value),
  },
  [FuelEconomyUnits.MILE_PER_GALLON]: {
    name: "Miles per gallon",
    symbol: "MPG",
    convertTo: (unit: FuelEconomyUnits, value: number): number => convertFuelEconomy(FuelEconomyUnits.MILE_PER_GALLON, unit, value),
  },
} as const

export default FUEL_ECONOMY_UNITS
