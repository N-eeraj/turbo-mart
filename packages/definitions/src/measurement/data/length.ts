import type {
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"

import {
  LengthUnits,
} from "#measurement/units"
import type {
  UnitsEnumMapValue,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to millimeter
const LENGTH_CONVERSION_FACTORS: Record<LengthUnits, number> = {
  [LengthUnits.MILLIMETER]: 1,
  [LengthUnits.CENTIMETER]: 10,
  [LengthUnits.METER]: 1_000,
  [LengthUnits.KILOMETER]: 1_000_000,
  [LengthUnits.INCH]: 25.4,
  [LengthUnits.FOOT]: 304.8,
  [LengthUnits.YARD]: 914.4,
  [LengthUnits.MILE]: 1609344,
}

/**
 * Convert a length value from one unit to another.
 */
export const convertLength: ConversionFn<MeasurementType.LENGTH> = (from, to, value) => {
  const fromFactor = LENGTH_CONVERSION_FACTORS[from]
  const toFactor = LENGTH_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const LENGTH_UNITS: UnitsEnumMapValue<LengthUnits> = {
  [LengthUnits.MILLIMETER]: {
    name: "Millimeter",
    symbol: "mm",
    convertTo: (unit: LengthUnits, value: number): number => convertLength(LengthUnits.MILLIMETER, unit, value),
  },
  [LengthUnits.CENTIMETER]: {
    name: "Centimeter",
    symbol: "cm",
    convertTo: (unit: LengthUnits, value: number): number => convertLength(LengthUnits.CENTIMETER, unit, value),
  },
  [LengthUnits.METER]: {
    name: "Meter",
    symbol: "m",
    convertTo: (unit: LengthUnits, value: number): number => convertLength(LengthUnits.METER, unit, value),
  },
  [LengthUnits.KILOMETER]: {
    name: "Kilometer",
    symbol: "km",
    convertTo: (unit: LengthUnits, value: number): number => convertLength(LengthUnits.KILOMETER, unit, value),
  },
  [LengthUnits.INCH]: {
    name: "Inch",
    symbol: "in",
    convertTo: (unit: LengthUnits, value: number): number => convertLength(LengthUnits.INCH, unit, value),
  },
  [LengthUnits.FOOT]: {
    name: "Foot",
    symbol: "ft",
    convertTo: (unit: LengthUnits, value: number): number => convertLength(LengthUnits.FOOT, unit, value),
  },
  [LengthUnits.YARD]: {
    name: "Yard",
    symbol: "yd",
    convertTo: (unit: LengthUnits, value: number): number => convertLength(LengthUnits.YARD, unit, value),
  },
  [LengthUnits.MILE]: {
    name: "Mile",
    symbol: "mi",
    convertTo: (unit: LengthUnits, value: number): number => convertLength(LengthUnits.MILE, unit, value),
  },
} as const

export default LENGTH_UNITS
