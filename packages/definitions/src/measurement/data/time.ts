import type {
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"

import {
  TimeUnits,
} from "#measurement/units"
import type {
  UnitsEnumMapValue,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to millisecond
const TIME_CONVERSION_FACTORS: Record<TimeUnits, number> = {
  [TimeUnits.MILLISECOND]: 1,
  [TimeUnits.SECOND]: 1_000,
  [TimeUnits.MINUTE]: 60_000,
  [TimeUnits.HOUR]: 3_600_000,
  [TimeUnits.DAY]: 86_400_000,
  [TimeUnits.WEEK]: 604_800_000,
  [TimeUnits.MONTH]: 2_592_000_000, // 30 days
  [TimeUnits.YEAR]: 31_536_000_000, // 365 days
}

/**
 * Convert a time value from one unit to another.
 */
export const convertTime: ConversionFn<MeasurementType.TIME> = (from, to, value) => {
  const fromFactor = TIME_CONVERSION_FACTORS[from]
  const toFactor = TIME_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const TIME_UNITS: UnitsEnumMapValue<TimeUnits> = {
  [TimeUnits.MILLISECOND]: {
    name: "Millisecond",
    symbol: "ms",
    convertTo: (unit: TimeUnits, value: number): number => convertTime(TimeUnits.MILLISECOND, unit, value),
  },
  [TimeUnits.SECOND]: {
    name: "Second",
    symbol: "s",
    convertTo: (unit: TimeUnits, value: number): number => convertTime(TimeUnits.SECOND, unit, value),
  },
  [TimeUnits.MINUTE]: {
    name: "Minute",
    symbol: "min",
    convertTo: (unit: TimeUnits, value: number): number => convertTime(TimeUnits.MINUTE, unit, value),
  },
  [TimeUnits.HOUR]: {
    name: "Hour",
    symbol: "h",
    convertTo: (unit: TimeUnits, value: number): number => convertTime(TimeUnits.HOUR, unit, value),
  },
  [TimeUnits.DAY]: {
    name: "Day",
    symbol: "d",
    convertTo: (unit: TimeUnits, value: number): number => convertTime(TimeUnits.DAY, unit, value),
  },
  [TimeUnits.WEEK]: {
    name: "Week",
    symbol: "wk",
    convertTo: (unit: TimeUnits, value: number): number => convertTime(TimeUnits.WEEK, unit, value),
  },
  [TimeUnits.MONTH]: {
    name: "Month",
    symbol: "mo",
    convertTo: (unit: TimeUnits, value: number): number => convertTime(TimeUnits.MONTH, unit, value),
  },
  [TimeUnits.YEAR]: {
    name: "Year",
    symbol: "yr",
    convertTo: (unit: TimeUnits, value: number): number => convertTime(TimeUnits.YEAR, unit, value),
  },
} as const

export default TIME_UNITS
