import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { ForceUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to newton
const FORCE_CONVERSION_FACTORS: Record<ForceUnits, number> = {
  [ForceUnits.NEWTON]: 1,
  [ForceUnits.KILONEWTON]: 1_000,       // 1 kN = 1000 N
  [ForceUnits.POUND_FORCE]: 4.44822,    // 1 lbf ≈ 4.44822 N
}

/**
 * Convert a force value from one unit to another.
 */
export const convertForce: ConversionFn<MeasurementType.FORCE> = (from, to, value) => {
  const fromFactor = FORCE_CONVERSION_FACTORS[from]
  const toFactor = FORCE_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const FORCE_UNITS: Record<ForceUnits, MeasurementUnitData<ForceUnits>> = {
  [ForceUnits.NEWTON]: {
    name: "Newton",
    symbol: "N",
    convertTo: (unit: ForceUnits, value: number): number => convertForce(ForceUnits.NEWTON, unit, value),
  },
  [ForceUnits.KILONEWTON]: {
    name: "Kilonewton",
    symbol: "kN",
    convertTo: (unit: ForceUnits, value: number): number => convertForce(ForceUnits.KILONEWTON, unit, value),
  },
  [ForceUnits.POUND_FORCE]: {
    name: "Pound-force",
    symbol: "lbf",
    convertTo: (unit: ForceUnits, value: number): number => convertForce(ForceUnits.POUND_FORCE, unit, value),
  },
} as const

export default FORCE_UNITS
