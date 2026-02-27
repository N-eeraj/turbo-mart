import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { DataRateUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to bits per second
const DATA_RATE_CONVERSION_FACTORS: Record<DataRateUnits, number> = {
  [DataRateUnits.BITS_PER_SECOND]: 1,
  [DataRateUnits.KILOBITS_PER_SECOND]: 1_000,      // 1 kbps = 1000 bps
  [DataRateUnits.MEGABITS_PER_SECOND]: 1_000_000,  // 1 Mbps = 1,000,000 bps
  [DataRateUnits.GIGABITS_PER_SECOND]: 1_000_000_000, // 1 Gbps = 1,000,000,000 bps
  [DataRateUnits.BYTES_PER_SECOND]: 8, // 1 B/s = 8 bps
}

/**
 * Convert a data rate value from one unit to another.
 */
export const convertDataRate: ConversionFn<MeasurementType.DATA_RATE> = (from, to, value) => {
  const fromFactor = DATA_RATE_CONVERSION_FACTORS[from]
  const toFactor = DATA_RATE_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const DATA_RATE_UNITS: Record<DataRateUnits, MeasurementUnitData<DataRateUnits>> = {
  [DataRateUnits.BITS_PER_SECOND]: {
    name: "Bits per second",
    symbol: "bps",
    convertTo: (unit: DataRateUnits, value: number): number => convertDataRate(DataRateUnits.BITS_PER_SECOND, unit, value),
  },
  [DataRateUnits.KILOBITS_PER_SECOND]: {
    name: "Kilobits per second",
    symbol: "kbps",
    convertTo: (unit: DataRateUnits, value: number): number => convertDataRate(DataRateUnits.KILOBITS_PER_SECOND, unit, value),
  },
  [DataRateUnits.MEGABITS_PER_SECOND]: {
    name: "Megabits per second",
    symbol: "Mbps",
    convertTo: (unit: DataRateUnits, value: number): number => convertDataRate(DataRateUnits.MEGABITS_PER_SECOND, unit, value),
  },
  [DataRateUnits.GIGABITS_PER_SECOND]: {
    name: "Gigabits per second",
    symbol: "Gbps",
    convertTo: (unit: DataRateUnits, value: number): number => convertDataRate(DataRateUnits.GIGABITS_PER_SECOND, unit, value),
  },
  [DataRateUnits.BYTES_PER_SECOND]: {
    name: "Bytes per second",
    symbol: "B/s",
    convertTo: (unit: DataRateUnits, value: number): number => convertDataRate(DataRateUnits.BYTES_PER_SECOND, unit, value),
  },
} as const

export default DATA_RATE_UNITS
