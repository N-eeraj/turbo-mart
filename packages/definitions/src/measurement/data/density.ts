import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { DensityUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to kilogram per cubic meter
const DENSITY_CONVERSION_FACTORS: Record<DensityUnits, number> = {
  [DensityUnits.KILOGRAM_PER_CUBIC_METER]: 1,
  [DensityUnits.GRAM_PER_CUBIC_CENTIMETER]: 1_000,    // 1 g/cm³ = 1000 kg/m³
  [DensityUnits.POUND_PER_CUBIC_FOOT]: 16.0185,       // 1 lb/ft³ ≈ 16.0185 kg/m³
}

/**
 * Convert a density value from one unit to another.
 */
export const convertDensity: ConversionFn<MeasurementType.DENSITY> = (from, to, value) => {
  const fromFactor = DENSITY_CONVERSION_FACTORS[from]
  const toFactor = DENSITY_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const DENSITY_UNITS: Record<DensityUnits, MeasurementUnitData<DensityUnits>> = {
  [DensityUnits.KILOGRAM_PER_CUBIC_METER]: {
    name: "Kilogram per cubic meter",
    symbol: "kg/m³",
    convertTo: (unit: DensityUnits, value: number): number => convertDensity(DensityUnits.KILOGRAM_PER_CUBIC_METER, unit, value),
  },
  [DensityUnits.GRAM_PER_CUBIC_CENTIMETER]: {
    name: "Gram per cubic centimeter",
    symbol: "g/cm³",
    convertTo: (unit: DensityUnits, value: number): number => convertDensity(DensityUnits.GRAM_PER_CUBIC_CENTIMETER, unit, value),
  },
  [DensityUnits.POUND_PER_CUBIC_FOOT]: {
    name: "Pound per cubic foot",
    symbol: "lb/ft³",
    convertTo: (unit: DensityUnits, value: number): number => convertDensity(DensityUnits.POUND_PER_CUBIC_FOOT, unit, value),
  },
} as const

export default DENSITY_UNITS
