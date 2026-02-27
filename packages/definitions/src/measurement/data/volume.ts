import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { VolumeUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to cubic millimeter
const VOLUME_CONVERSION_FACTORS: Record<VolumeUnits, number> = {
  [VolumeUnits.CUBIC_MILLIMETER]: 1,
  [VolumeUnits.CUBIC_CENTIMETER]: 1_000,
  [VolumeUnits.MILLILITER]: 1_000, // same as cubic centimeter
  [VolumeUnits.LITER]: 1_000_000,
  [VolumeUnits.CUBIC_METER]: 1_000_000_000,
  [VolumeUnits.CUBIC_INCH]: 16_387.064,
  [VolumeUnits.CUBIC_FOOT]: 28_316_846.592,
  [VolumeUnits.CUBIC_YARD]: 764_554_857.984,
  [VolumeUnits.GALLON]: 3_785_411.784, // US gallon
}

/**
 * Convert a volume value from one unit to another.
 */
export const convertVolume: ConversionFn<MeasurementType.VOLUME> = (from, to, value) => {
  const fromFactor = VOLUME_CONVERSION_FACTORS[from]
  const toFactor = VOLUME_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const VOLUME_UNITS: Record<VolumeUnits, MeasurementUnitData<VolumeUnits>> = {
  [VolumeUnits.CUBIC_MILLIMETER]: {
    name: "Cubic Millimeter",
    symbol: "mm³",
    convertTo: (unit: VolumeUnits, value: number): number => convertVolume(VolumeUnits.CUBIC_MILLIMETER, unit, value),
  },
  [VolumeUnits.CUBIC_CENTIMETER]: {
    name: "Cubic Centimeter",
    symbol: "cm³",
    convertTo: (unit: VolumeUnits, value: number): number => convertVolume(VolumeUnits.CUBIC_CENTIMETER, unit, value),
  },
  [VolumeUnits.MILLILITER]: {
    name: "Milliliter",
    symbol: "mL",
    convertTo: (unit: VolumeUnits, value: number): number => convertVolume(VolumeUnits.MILLILITER, unit, value),
  },
  [VolumeUnits.LITER]: {
    name: "Liter",
    symbol: "L",
    convertTo: (unit: VolumeUnits, value: number): number => convertVolume(VolumeUnits.LITER, unit, value),
  },
  [VolumeUnits.CUBIC_METER]: {
    name: "Cubic Meter",
    symbol: "m³",
    convertTo: (unit: VolumeUnits, value: number): number => convertVolume(VolumeUnits.CUBIC_METER, unit, value),
  },
  [VolumeUnits.CUBIC_INCH]: {
    name: "Cubic Inch",
    symbol: "in³",
    convertTo: (unit: VolumeUnits, value: number): number => convertVolume(VolumeUnits.CUBIC_INCH, unit, value),
  },
  [VolumeUnits.CUBIC_FOOT]: {
    name: "Cubic Foot",
    symbol: "ft³",
    convertTo: (unit: VolumeUnits, value: number): number => convertVolume(VolumeUnits.CUBIC_FOOT, unit, value),
  },
  [VolumeUnits.CUBIC_YARD]: {
    name: "Cubic Yard",
    symbol: "yd³",
    convertTo: (unit: VolumeUnits, value: number): number => convertVolume(VolumeUnits.CUBIC_YARD, unit, value),
  },
  [VolumeUnits.GALLON]: {
    name: "Gallon",
    symbol: "gal",
    convertTo: (unit: VolumeUnits, value: number): number => convertVolume(VolumeUnits.GALLON, unit, value),
  },
} as const

export default VOLUME_UNITS
