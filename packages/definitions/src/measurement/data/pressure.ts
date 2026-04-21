import type {
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"

import {
  PressureUnits,
} from "#measurement/units"
import type {
  UnitsEnumMapValue,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to pascal
const PRESSURE_CONVERSION_FACTORS: Record<PressureUnits, number> = {
  [PressureUnits.PASCAL]: 1,
  [PressureUnits.KILOPASCAL]: 1_000,        // 1 kPa = 1000 Pa
  [PressureUnits.BAR]: 100_000,            // 1 bar = 100,000 Pa
  [PressureUnits.PSI]: 6_894.76,           // 1 psi ≈ 6894.76 Pa
  [PressureUnits.ATMOSPHERE]: 101_325,     // 1 atm = 101,325 Pa
}

/**
 * Convert a pressure value from one unit to another.
 */
export const convertPressure: ConversionFn<MeasurementType.PRESSURE> = (from, to, value) => {
  const fromFactor = PRESSURE_CONVERSION_FACTORS[from]
  const toFactor = PRESSURE_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const PRESSURE_UNITS: UnitsEnumMapValue<PressureUnits> = {
  [PressureUnits.PASCAL]: {
    name: "Pascal",
    symbol: "Pa",
    convertTo: (unit: PressureUnits, value: number): number => convertPressure(PressureUnits.PASCAL, unit, value),
  },
  [PressureUnits.KILOPASCAL]: {
    name: "Kilopascal",
    symbol: "kPa",
    convertTo: (unit: PressureUnits, value: number): number => convertPressure(PressureUnits.KILOPASCAL, unit, value),
  },
  [PressureUnits.BAR]: {
    name: "Bar",
    symbol: "bar",
    convertTo: (unit: PressureUnits, value: number): number => convertPressure(PressureUnits.BAR, unit, value),
  },
  [PressureUnits.PSI]: {
    name: "Pounds per square inch",
    symbol: "psi",
    convertTo: (unit: PressureUnits, value: number): number => convertPressure(PressureUnits.PSI, unit, value),
  },
  [PressureUnits.ATMOSPHERE]: {
    name: "Standard atmosphere",
    symbol: "atm",
    convertTo: (unit: PressureUnits, value: number): number => convertPressure(PressureUnits.ATMOSPHERE, unit, value),
  },
} as const

export default PRESSURE_UNITS
