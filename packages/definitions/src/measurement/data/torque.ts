import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { TorqueUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to newton meter
const TORQUE_CONVERSION_FACTORS: Record<TorqueUnits, number> = {
  [TorqueUnits.NEWTON_METER]: 1,
  [TorqueUnits.POUND_FOOT]: 1.35582, // 1 lb·ft ≈ 1.35582 N·m
}

/**
 * Convert a torque value from one unit to another.
 */
export const convertTorque: ConversionFn<MeasurementType.TORQUE> = (from, to, value) => {
  const fromFactor = TORQUE_CONVERSION_FACTORS[from]
  const toFactor = TORQUE_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const TORQUE_UNITS: Record<TorqueUnits, MeasurementUnitData<TorqueUnits>> = {
  [TorqueUnits.NEWTON_METER]: {
    name: "Newton meter",
    symbol: "N·m",
    convertTo: (unit: TorqueUnits, value: number): number => convertTorque(TorqueUnits.NEWTON_METER, unit, value),
  },
  [TorqueUnits.POUND_FOOT]: {
    name: "Pound-foot",
    symbol: "lb·ft",
    convertTo: (unit: TorqueUnits, value: number): number => convertTorque(TorqueUnits.POUND_FOOT, unit, value),
  },
} as const

export default TORQUE_UNITS
