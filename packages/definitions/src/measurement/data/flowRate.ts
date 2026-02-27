import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { FlowRateUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to cubic meter per second
const FLOW_RATE_CONVERSION_FACTORS: Record<FlowRateUnits, number> = {
  [FlowRateUnits.CUBIC_METER_PER_SECOND]: 1,
  [FlowRateUnits.LITER_PER_SECOND]: 0.001,        // 1 L/s = 0.001 m³/s
  [FlowRateUnits.LITER_PER_MINUTE]: 0.001 / 60,   // 1 L/min = 0.001/60 m³/s
  [FlowRateUnits.GALLON_PER_MINUTE]: 3.78541e-3 / 60, // 1 US gallon/min ≈ 3.78541e-3/60 m³/s
}

/**
 * Convert a flow rate value from one unit to another.
 */
export const convertFlowRate: ConversionFn<MeasurementType.FLOW_RATE> = (from, to, value) => {
  const fromFactor = FLOW_RATE_CONVERSION_FACTORS[from]
  const toFactor = FLOW_RATE_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const FLOW_RATE_UNITS: Record<FlowRateUnits, MeasurementUnitData<FlowRateUnits>> = {
  [FlowRateUnits.CUBIC_METER_PER_SECOND]: {
    name: "Cubic meter per second",
    symbol: "m³/s",
    convertTo: (unit: FlowRateUnits, value: number): number => convertFlowRate(FlowRateUnits.CUBIC_METER_PER_SECOND, unit, value),
  },
  [FlowRateUnits.LITER_PER_SECOND]: {
    name: "Liter per second",
    symbol: "L/s",
    convertTo: (unit: FlowRateUnits, value: number): number => convertFlowRate(FlowRateUnits.LITER_PER_SECOND, unit, value),
  },
  [FlowRateUnits.LITER_PER_MINUTE]: {
    name: "Liter per minute",
    symbol: "L/min",
    convertTo: (unit: FlowRateUnits, value: number): number => convertFlowRate(FlowRateUnits.LITER_PER_MINUTE, unit, value),
  },
  [FlowRateUnits.GALLON_PER_MINUTE]: {
    name: "Gallon per minute",
    symbol: "GPM",
    convertTo: (unit: FlowRateUnits, value: number): number => convertFlowRate(FlowRateUnits.GALLON_PER_MINUTE, unit, value),
  },
} as const

export default FLOW_RATE_UNITS
