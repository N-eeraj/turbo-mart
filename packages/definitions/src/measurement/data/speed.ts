import type {
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"

import {
  SpeedUnits,
} from "#measurement/units"
import type {
  UnitsEnumMapValue,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to meter per second
const SPEED_CONVERSION_FACTORS: Record<SpeedUnits, number> = {
  [SpeedUnits.METER_PER_SECOND]: 1,
  [SpeedUnits.KILOMETER_PER_HOUR]: 1 / 3.6, // 1 m/s = 3.6 km/h
  [SpeedUnits.MILE_PER_HOUR]: 0.44704, // 1 mph = 0.44704 m/s
  [SpeedUnits.FOOT_PER_SECOND]: 0.3048, // 1 ft/s = 0.3048 m/s
  [SpeedUnits.KNOT]: 0.514444, // 1 knot = 0.514444 m/s
}

/**
 * Convert a speed value from one unit to another.
 */
export const convertSpeed: ConversionFn<MeasurementType.SPEED> = (from, to, value) => {
  const fromFactor = SPEED_CONVERSION_FACTORS[from]
  const toFactor = SPEED_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const SPEED_UNITS: UnitsEnumMapValue<SpeedUnits> = {
  [SpeedUnits.METER_PER_SECOND]: {
    name: "Meter per second",
    symbol: "m/s",
    convertTo: (unit: SpeedUnits, value: number): number => convertSpeed(SpeedUnits.METER_PER_SECOND, unit, value),
  },
  [SpeedUnits.KILOMETER_PER_HOUR]: {
    name: "Kilometer per hour",
    symbol: "km/h",
    convertTo: (unit: SpeedUnits, value: number): number => convertSpeed(SpeedUnits.KILOMETER_PER_HOUR, unit, value),
  },
  [SpeedUnits.MILE_PER_HOUR]: {
    name: "Mile per hour",
    symbol: "mph",
    convertTo: (unit: SpeedUnits, value: number): number => convertSpeed(SpeedUnits.MILE_PER_HOUR, unit, value),
  },
  [SpeedUnits.FOOT_PER_SECOND]: {
    name: "Foot per second",
    symbol: "ft/s",
    convertTo: (unit: SpeedUnits, value: number): number => convertSpeed(SpeedUnits.FOOT_PER_SECOND, unit, value),
  },
  [SpeedUnits.KNOT]: {
    name: "Knot",
    symbol: "kn",
    convertTo: (unit: SpeedUnits, value: number): number => convertSpeed(SpeedUnits.KNOT, unit, value),
  },
} as const

export default SPEED_UNITS
