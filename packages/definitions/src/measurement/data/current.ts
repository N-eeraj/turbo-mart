import type {
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"

import {
  CurrentUnits,
} from "#measurement/units"
import type {
  UnitsEnumMapValue,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to microampere
const CURRENT_CONVERSION_FACTORS: Record<CurrentUnits, number> = {
  [CurrentUnits.MICROAMPERE]: 1,
  [CurrentUnits.MILLIAMPERE]: 1_000,   // 1 mA = 1000 µA
  [CurrentUnits.AMPERE]: 1_000_000,    // 1 A = 1,000,000 µA
  [CurrentUnits.KILOAMPERE]: 1_000_000_000, // 1 kA = 1,000,000,000 µA
}

/**
 * Convert a current value from one unit to another.
 */
export const convertCurrent: ConversionFn<MeasurementType.CURRENT> = (from, to, value) => {
  const fromFactor = CURRENT_CONVERSION_FACTORS[from]
  const toFactor = CURRENT_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const CURRENT_UNITS: UnitsEnumMapValue<CurrentUnits> = {
  [CurrentUnits.MICROAMPERE]: {
    name: "Microampere",
    symbol: "µA",
    convertTo: (unit: CurrentUnits, value: number): number => convertCurrent(CurrentUnits.MICROAMPERE, unit, value),
  },
  [CurrentUnits.MILLIAMPERE]: {
    name: "Milliampere",
    symbol: "mA",
    convertTo: (unit: CurrentUnits, value: number): number => convertCurrent(CurrentUnits.MILLIAMPERE, unit, value),
  },
  [CurrentUnits.AMPERE]: {
    name: "Ampere",
    symbol: "A",
    convertTo: (unit: CurrentUnits, value: number): number => convertCurrent(CurrentUnits.AMPERE, unit, value),
  },
  [CurrentUnits.KILOAMPERE]: {
    name: "Kiloampere",
    symbol: "kA",
    convertTo: (unit: CurrentUnits, value: number): number => convertCurrent(CurrentUnits.KILOAMPERE, unit, value),
  },
} as const

export default CURRENT_UNITS
