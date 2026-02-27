import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { FrequencyUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to hertz
const FREQUENCY_CONVERSION_FACTORS: Record<FrequencyUnits, number> = {
  [FrequencyUnits.HERTZ]: 1,
  [FrequencyUnits.KILOHERTZ]: 1_000,       // 1 kHz = 1,000 Hz
  [FrequencyUnits.MEGAHERTZ]: 1_000_000,   // 1 MHz = 1,000,000 Hz
  [FrequencyUnits.GIGAHERTZ]: 1_000_000_000,// 1 GHz = 1,000,000,000 Hz
}

/**
 * Convert a frequency value from one unit to another.
 */
export const convertFrequency: ConversionFn<MeasurementType.FREQUENCY> = (from, to, value) => {
  const fromFactor = FREQUENCY_CONVERSION_FACTORS[from]
  const toFactor = FREQUENCY_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const FREQUENCY_UNITS: Record<FrequencyUnits, MeasurementUnitData<FrequencyUnits>> = {
  [FrequencyUnits.HERTZ]: {
    name: "Hertz",
    symbol: "Hz",
    convertTo: (unit: FrequencyUnits, value: number): number => convertFrequency(FrequencyUnits.HERTZ, unit, value),
  },
  [FrequencyUnits.KILOHERTZ]: {
    name: "Kilohertz",
    symbol: "kHz",
    convertTo: (unit: FrequencyUnits, value: number): number => convertFrequency(FrequencyUnits.KILOHERTZ, unit, value),
  },
  [FrequencyUnits.MEGAHERTZ]: {
    name: "Megahertz",
    symbol: "MHz",
    convertTo: (unit: FrequencyUnits, value: number): number => convertFrequency(FrequencyUnits.MEGAHERTZ, unit, value),
  },
  [FrequencyUnits.GIGAHERTZ]: {
    name: "Gigahertz",
    symbol: "GHz",
    convertTo: (unit: FrequencyUnits, value: number): number => convertFrequency(FrequencyUnits.GIGAHERTZ, unit, value),
  },
} as const

export default FREQUENCY_UNITS
