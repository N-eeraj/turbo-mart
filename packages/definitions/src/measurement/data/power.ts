import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { PowerUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to watt
const POWER_CONVERSION_FACTORS: Record<PowerUnits, number> = {
  [PowerUnits.WATT]: 1,
  [PowerUnits.KILOWATT]: 1_000,      // 1 kW = 1000 W
  [PowerUnits.MEGAWATT]: 1_000_000,  // 1 MW = 1,000,000 W
  [PowerUnits.GIGAWATT]: 1_000_000_000,// 1 GW = 1,000,000,000 W
  [PowerUnits.HORSEPOWER]: 745.7,    // 1 hp ≈ 745.7 W
}

/**
 * Convert a power value from one unit to another.
 */
export const convertPower: ConversionFn<MeasurementType.POWER> = (from, to, value) => {
  const fromFactor = POWER_CONVERSION_FACTORS[from]
  const toFactor = POWER_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const POWER_UNITS: Record<PowerUnits, MeasurementUnitData<PowerUnits>> = {
  [PowerUnits.WATT]: {
    name: "Watt",
    symbol: "W",
    convertTo: (unit: PowerUnits, value: number): number => convertPower(PowerUnits.WATT, unit, value),
  },
  [PowerUnits.KILOWATT]: {
    name: "Kilowatt",
    symbol: "kW",
    convertTo: (unit: PowerUnits, value: number): number => convertPower(PowerUnits.KILOWATT, unit, value),
  },
  [PowerUnits.MEGAWATT]: {
    name: "Megawatt",
    symbol: "MW",
    convertTo: (unit: PowerUnits, value: number): number => convertPower(PowerUnits.MEGAWATT, unit, value),
  },
  [PowerUnits.GIGAWATT]: {
    name: "Gigawatt",
    symbol: "GW",
    convertTo: (unit: PowerUnits, value: number): number => convertPower(PowerUnits.GIGAWATT, unit, value),
  },
  [PowerUnits.HORSEPOWER]: {
    name: "Horsepower",
    symbol: "hp",
    convertTo: (unit: PowerUnits, value: number): number => convertPower(PowerUnits.HORSEPOWER, unit, value),
  },
} as const

export default POWER_UNITS
