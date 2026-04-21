import type {
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"

import {
  ResistanceUnits,
} from "#measurement/units"
import type {
  UnitsEnumMapValue,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to ohm
const RESISTANCE_CONVERSION_FACTORS: Record<ResistanceUnits, number> = {
  [ResistanceUnits.OHM]: 1,
  [ResistanceUnits.KILO_OHM]: 1_000,   // 1 kΩ = 1000 Ω
  [ResistanceUnits.MEGA_OHM]: 1_000_000, // 1 MΩ = 1,000,000 Ω
}

/**
 * Convert a resistance value from one unit to another.
 */
export const convertResistance: ConversionFn<MeasurementType.RESISTANCE> = (from, to, value) => {
  const fromFactor = RESISTANCE_CONVERSION_FACTORS[from]
  const toFactor = RESISTANCE_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const RESISTANCE_UNITS: UnitsEnumMapValue<ResistanceUnits> = {
  [ResistanceUnits.OHM]: {
    name: "Ohm",
    symbol: "Ω",
    convertTo: (unit: ResistanceUnits, value: number): number => convertResistance(ResistanceUnits.OHM, unit, value),
  },
  [ResistanceUnits.KILO_OHM]: {
    name: "Kilo ohm",
    symbol: "kΩ",
    convertTo: (unit: ResistanceUnits, value: number): number => convertResistance(ResistanceUnits.KILO_OHM, unit, value),
  },
  [ResistanceUnits.MEGA_OHM]: {
    name: "Mega ohm",
    symbol: "MΩ",
    convertTo: (unit: ResistanceUnits, value: number): number => convertResistance(ResistanceUnits.MEGA_OHM, unit, value),
  },
} as const

export default RESISTANCE_UNITS
