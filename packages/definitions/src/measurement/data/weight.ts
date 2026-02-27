import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { WeightUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to milligram
const WEIGHT_CONVERSION_FACTORS: Record<WeightUnits, number> = {
  [WeightUnits.MILLIGRAM]: 1,
  [WeightUnits.GRAM]: 1_000,
  [WeightUnits.KILOGRAM]: 1_000_000,
  [WeightUnits.METRIC_TON]: 1_000_000_000,
  [WeightUnits.OUNCE]: 28_349.523125,
  [WeightUnits.POUND]: 453_592.37,
  [WeightUnits.TON]: 907_184_740,
}

/**
 * Convert a weight value from one unit to another.
 */
export const convertWeight: ConversionFn<MeasurementType.WEIGHT> = (from, to, value) => {
  const fromFactor = WEIGHT_CONVERSION_FACTORS[from]
  const toFactor = WEIGHT_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const WEIGHT_UNITS: Record<WeightUnits, MeasurementUnitData<WeightUnits>> = {
  [WeightUnits.MILLIGRAM]: {
    name: "Milligram",
    symbol: "mg",
    convertTo: (unit: WeightUnits, value: number): number => convertWeight(WeightUnits.MILLIGRAM, unit, value),
  },
  [WeightUnits.GRAM]: {
    name: "Gram",
    symbol: "g",
    convertTo: (unit: WeightUnits, value: number): number => convertWeight(WeightUnits.GRAM, unit, value),
  },
  [WeightUnits.KILOGRAM]: {
    name: "Kilogram",
    symbol: "kg",
    convertTo: (unit: WeightUnits, value: number): number => convertWeight(WeightUnits.KILOGRAM, unit, value),
  },
  [WeightUnits.METRIC_TON]: {
    name: "Metric Ton",
    symbol: "t",
    convertTo: (unit: WeightUnits, value: number): number => convertWeight(WeightUnits.METRIC_TON, unit, value),
  },
  [WeightUnits.OUNCE]: {
    name: "Ounce",
    symbol: "oz",
    convertTo: (unit: WeightUnits, value: number): number => convertWeight(WeightUnits.OUNCE, unit, value),
  },
  [WeightUnits.POUND]: {
    name: "Pound",
    symbol: "lb",
    convertTo: (unit: WeightUnits, value: number): number => convertWeight(WeightUnits.POUND, unit, value),
  },
  [WeightUnits.TON]: {
    name: "US Ton",
    symbol: "ton",
    convertTo: (unit: WeightUnits, value: number): number => convertWeight(WeightUnits.TON, unit, value),
  },
} as const

export default WEIGHT_UNITS
