import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { AccelerationUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to meter per second squared
const ACCELERATION_CONVERSION_FACTORS: Record<AccelerationUnits, number> = {
  [AccelerationUnits.METER_PER_SECOND_SQUARED]: 1,
  [AccelerationUnits.FOOT_PER_SECOND_SQUARED]: 0.3048, // 1 ft/s² = 0.3048 m/s²
  [AccelerationUnits.G_FORCE]: 9.80665, // 1 g = 9.80665 m/s²
}

/**
 * Convert an acceleration value from one unit to another.
 */
export const convertAcceleration: ConversionFn<MeasurementType.ACCELERATION> = (from, to, value) => {
  const fromFactor = ACCELERATION_CONVERSION_FACTORS[from]
  const toFactor = ACCELERATION_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const ACCELERATION_UNITS: Record<AccelerationUnits, MeasurementUnitData<AccelerationUnits>> = {
  [AccelerationUnits.METER_PER_SECOND_SQUARED]: {
    name: "Meter per second squared",
    symbol: "m/s²",
    convertTo: (unit: AccelerationUnits, value: number): number => convertAcceleration(AccelerationUnits.METER_PER_SECOND_SQUARED, unit, value),
  },
  [AccelerationUnits.FOOT_PER_SECOND_SQUARED]: {
    name: "Foot per second squared",
    symbol: "ft/s²",
    convertTo: (unit: AccelerationUnits, value: number): number => convertAcceleration(AccelerationUnits.FOOT_PER_SECOND_SQUARED, unit, value),
  },
  [AccelerationUnits.G_FORCE]: {
    name: "Standard Gravity",
    symbol: "g",
    convertTo: (unit: AccelerationUnits, value: number): number => convertAcceleration(AccelerationUnits.G_FORCE, unit, value),
  },
} as const

export default ACCELERATION_UNITS
