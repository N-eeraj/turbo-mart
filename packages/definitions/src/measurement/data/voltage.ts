import type {
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"

import {
  VoltageUnits,
} from "#measurement/units"
import type {
  UnitsEnumMapValue,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to millivolt
const VOLTAGE_CONVERSION_FACTORS: Record<VoltageUnits, number> = {
  [VoltageUnits.MILLIVOLT]: 1,
  [VoltageUnits.VOLT]: 1_000,       // 1 V = 1000 mV
  [VoltageUnits.KILOVOLT]: 1_000_000, // 1 kV = 1,000,000 mV
}

/**
 * Convert a voltage value from one unit to another.
 */
export const convertVoltage: ConversionFn<MeasurementType.VOLTAGE> = (from, to, value) => {
  const fromFactor = VOLTAGE_CONVERSION_FACTORS[from]
  const toFactor = VOLTAGE_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const VOLTAGE_UNITS: UnitsEnumMapValue<VoltageUnits> = {
  [VoltageUnits.MILLIVOLT]: {
    name: "Millivolt",
    symbol: "mV",
    convertTo: (unit: VoltageUnits, value: number): number => convertVoltage(VoltageUnits.MILLIVOLT, unit, value),
  },
  [VoltageUnits.VOLT]: {
    name: "Volt",
    symbol: "V",
    convertTo: (unit: VoltageUnits, value: number): number => convertVoltage(VoltageUnits.VOLT, unit, value),
  },
  [VoltageUnits.KILOVOLT]: {
    name: "Kilovolt",
    symbol: "kV",
    convertTo: (unit: VoltageUnits, value: number): number => convertVoltage(VoltageUnits.KILOVOLT, unit, value),
  },
} as const

export default VOLTAGE_UNITS
