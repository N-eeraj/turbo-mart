import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { AreaUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to SQUARE_MILLIMETER
const AREA_CONVERSION_FACTORS: Record<AreaUnits, number> = {
  [AreaUnits.SQUARE_MILLIMETER]: 1,
  [AreaUnits.SQUARE_CENTIMETER]: 100,
  [AreaUnits.SQUARE_METER]: 1_000_000,
  [AreaUnits.SQUARE_KILOMETER]: 1_000_000_000_000,
  [AreaUnits.SQUARE_INCH]: 645.16,
  [AreaUnits.SQUARE_FOOT]: 92_903.04,
  [AreaUnits.SQUARE_YARD]: 836_127.36,
  [AreaUnits.ACRE]: 4_046_856_422.4,
  [AreaUnits.HECTARE]: 10_000_000_000,
}

/**
 * Convert an area value from one unit to another.
 */
export const convertArea: ConversionFn<MeasurementType.AREA> = (from, to, value) => {
  const fromFactor = AREA_CONVERSION_FACTORS[from]
  const toFactor = AREA_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const AREA_UNITS: Record<AreaUnits, MeasurementUnitData<AreaUnits>> = {
  [AreaUnits.SQUARE_MILLIMETER]: {
    name: "Square Millimeter",
    symbol: "mm²",
    convertTo: (unit: AreaUnits, value: number) => convertArea(AreaUnits.SQUARE_MILLIMETER, unit, value),
  },
  [AreaUnits.SQUARE_CENTIMETER]: {
    name: "Square Centimeter",
    symbol: "cm²",
    convertTo: (unit: AreaUnits, value: number) => convertArea(AreaUnits.SQUARE_CENTIMETER, unit, value),
  },
  [AreaUnits.SQUARE_METER]: {
    name: "Square Meter",
    symbol: "m²",
    convertTo: (unit: AreaUnits, value: number) => convertArea(AreaUnits.SQUARE_METER, unit, value),
  },
  [AreaUnits.SQUARE_KILOMETER]: {
    name: "Square Kilometer",
    symbol: "km²",
    convertTo: (unit: AreaUnits, value: number) => convertArea(AreaUnits.SQUARE_KILOMETER, unit, value),
  },
  [AreaUnits.SQUARE_INCH]: {
    name: "Square Inch",
    symbol: "in²",
    convertTo: (unit: AreaUnits, value: number) => convertArea(AreaUnits.SQUARE_INCH, unit, value),
  },
  [AreaUnits.SQUARE_FOOT]: {
    name: "Square Foot",
    symbol: "ft²",
    convertTo: (unit: AreaUnits, value: number) => convertArea(AreaUnits.SQUARE_FOOT, unit, value),
  },
  [AreaUnits.SQUARE_YARD]: {
    name: "Square Yard",
    symbol: "yd²",
    convertTo: (unit: AreaUnits, value: number) => convertArea(AreaUnits.SQUARE_YARD, unit, value),
  },
  [AreaUnits.ACRE]: {
    name: "Acre",
    symbol: "ac",
    convertTo: (unit: AreaUnits, value: number) => convertArea(AreaUnits.ACRE, unit, value),
  },
  [AreaUnits.HECTARE]: {
    name: "Hectare",
    symbol: "ha",
    convertTo: (unit: AreaUnits, value: number) => convertArea(AreaUnits.HECTARE, unit, value),
  },
} as const

export default AREA_UNITS
