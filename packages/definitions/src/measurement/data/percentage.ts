import type {
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"

import {
  PercentageUnits,
} from "#measurement/units"
import type {
  UnitsEnumMapValue,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to percent
const PERCENTAGE_CONVERSION_FACTORS: Record<PercentageUnits, number> = {
  [PercentageUnits.PERCENT]: 1,
  [PercentageUnits.PER_MILLE]: 0.1, // 1‰ = 0.1%
}

/**
 * Convert a percentage or per mille value from one unit to another.
 */
export const convertPercentage: ConversionFn<MeasurementType.PERCENTAGE> = (from, to, value) => {
  const fromFactor = PERCENTAGE_CONVERSION_FACTORS[from]
  const toFactor = PERCENTAGE_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const PERCENTAGE_UNITS: UnitsEnumMapValue<PercentageUnits> = {
  [PercentageUnits.PERCENT]: {
    name: "Percent",
    symbol: "%",
    convertTo: (unit: PercentageUnits, value: number): number => convertPercentage(PercentageUnits.PERCENT, unit, value),
  },
  [PercentageUnits.PER_MILLE]: {
    name: "Per mille",
    symbol: "‰",
    convertTo: (unit: PercentageUnits, value: number): number => convertPercentage(PercentageUnits.PER_MILLE, unit, value),
  },
} as const

export default PERCENTAGE_UNITS
