import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { EnergyUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to joule
const ENERGY_CONVERSION_FACTORS: Record<EnergyUnits, number> = {
  [EnergyUnits.JOULE]: 1,
  [EnergyUnits.KILOJOULE]: 1_000,        // 1 kJ = 1000 J
  [EnergyUnits.CALORIE]: 4.184,          // 1 cal = 4.184 J
  [EnergyUnits.KILOCALORIE]: 4_184,      // 1 kcal = 4184 J
  [EnergyUnits.WATT_HOUR]: 3_600,        // 1 Wh = 3600 J
  [EnergyUnits.KILOWATT_HOUR]: 3_600_000,// 1 kWh = 3,600,000 J
  [EnergyUnits.ELECTRONVOLT]: 1.60218e-19,// 1 eV = 1.60218 × 10⁻¹⁹ J
}

/**
 * Convert an energy value from one unit to another.
 */
export const convertEnergy: ConversionFn<MeasurementType.ENERGY> = (from, to, value) => {
  const fromFactor = ENERGY_CONVERSION_FACTORS[from]
  const toFactor = ENERGY_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const ENERGY_UNITS: Record<EnergyUnits, MeasurementUnitData<EnergyUnits>> = {
  [EnergyUnits.JOULE]: {
    name: "Joule",
    symbol: "J",
    convertTo: (unit: EnergyUnits, value: number): number => convertEnergy(EnergyUnits.JOULE, unit, value),
  },
  [EnergyUnits.KILOJOULE]: {
    name: "Kilojoule",
    symbol: "kJ",
    convertTo: (unit: EnergyUnits, value: number): number => convertEnergy(EnergyUnits.KILOJOULE, unit, value),
  },
  [EnergyUnits.CALORIE]: {
    name: "Calorie",
    symbol: "cal",
    convertTo: (unit: EnergyUnits, value: number): number => convertEnergy(EnergyUnits.CALORIE, unit, value),
  },
  [EnergyUnits.KILOCALORIE]: {
    name: "Kilocalorie",
    symbol: "kcal",
    convertTo: (unit: EnergyUnits, value: number): number => convertEnergy(EnergyUnits.KILOCALORIE, unit, value),
  },
  [EnergyUnits.WATT_HOUR]: {
    name: "Watt-hour",
    symbol: "Wh",
    convertTo: (unit: EnergyUnits, value: number): number => convertEnergy(EnergyUnits.WATT_HOUR, unit, value),
  },
  [EnergyUnits.KILOWATT_HOUR]: {
    name: "Kilowatt-hour",
    symbol: "kWh",
    convertTo: (unit: EnergyUnits, value: number): number => convertEnergy(EnergyUnits.KILOWATT_HOUR, unit, value),
  },
  [EnergyUnits.ELECTRONVOLT]: {
    name: "Electronvolt",
    symbol: "eV",
    convertTo: (unit: EnergyUnits, value: number): number => convertEnergy(EnergyUnits.ELECTRONVOLT, unit, value),
  },
} as const

export default ENERGY_UNITS
