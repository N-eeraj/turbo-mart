import type {
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"

import {
  AngleUnits,
} from "#measurement/units"
import type {
  UnitsEnumMapValue,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to degree
const ANGLE_CONVERSION_FACTORS: Record<AngleUnits, number> = {
  [AngleUnits.DEGREE]: 1,
  [AngleUnits.RADIAN]: 180 / Math.PI,   // 1 rad = 180/π deg
  [AngleUnits.GRADIAN]: 0.9,            // 1 grad = 0.9 deg
  [AngleUnits.ARCSECOND]: 1 / 3600,     // 1" = 1/3600 deg
}

/**
 * Convert an angle value from one unit to another.
 */
export const convertAngle: ConversionFn<MeasurementType.ANGLE> = (from, to, value) => {
  const fromFactor = ANGLE_CONVERSION_FACTORS[from]
  const toFactor = ANGLE_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const ANGLE_UNITS: UnitsEnumMapValue<AngleUnits> = {
  [AngleUnits.DEGREE]: {
    name: "Degree",
    symbol: "°",
    convertTo: (unit: AngleUnits, value: number): number => convertAngle(AngleUnits.DEGREE, unit, value),
  },
  [AngleUnits.RADIAN]: {
    name: "Radian",
    symbol: "rad",
    convertTo: (unit: AngleUnits, value: number): number => convertAngle(AngleUnits.RADIAN, unit, value),
  },
  [AngleUnits.GRADIAN]: {
    name: "Gradian",
    symbol: "gon",
    convertTo: (unit: AngleUnits, value: number): number => convertAngle(AngleUnits.GRADIAN, unit, value),
  },
  [AngleUnits.ARCSECOND]: {
    name: "Arcsecond",
    symbol: "\"",
    convertTo: (unit: AngleUnits, value: number): number => convertAngle(AngleUnits.ARCSECOND, unit, value),
  },
} as const

export default ANGLE_UNITS
