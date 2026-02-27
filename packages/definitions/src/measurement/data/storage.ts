import type { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import { StorageUnits } from "#measurement/units"
import type {
  MeasurementUnitData,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to bit
const STORAGE_CONVERSION_FACTORS: Record<StorageUnits, number> = {
  [StorageUnits.BIT]: 1,
  [StorageUnits.BYTE]: 8, // 1 byte = 8 bits
  [StorageUnits.KILOBYTE]: 8 * 1024,
  [StorageUnits.MEGABYTE]: 8 * 1024 * 1024,
  [StorageUnits.GIGABYTE]: 8 * 1024 * 1024 * 1024,
  [StorageUnits.TERABYTE]: 8 * 1024 * 1024 * 1024 * 1024,
  [StorageUnits.PETABYTE]: 8 * 1024 * 1024 * 1024 * 1024 * 1024,
}

/**
 * Convert a storage value from one unit to another.
 */
export const convertStorage: ConversionFn<MeasurementType.STORAGE> = (from, to, value) => {
  const fromFactor = STORAGE_CONVERSION_FACTORS[from]
  const toFactor = STORAGE_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const STORAGE_UNITS: Record<StorageUnits, MeasurementUnitData<StorageUnits>> = {
  [StorageUnits.BIT]: {
    name: "Bit",
    symbol: "b",
    convertTo: (unit: StorageUnits, value: number): number => convertStorage(StorageUnits.BIT, unit, value),
  },
  [StorageUnits.BYTE]: {
    name: "Byte",
    symbol: "B",
    convertTo: (unit: StorageUnits, value: number): number => convertStorage(StorageUnits.BYTE, unit, value),
  },
  [StorageUnits.KILOBYTE]: {
    name: "Kilobyte",
    symbol: "KB",
    convertTo: (unit: StorageUnits, value: number): number => convertStorage(StorageUnits.KILOBYTE, unit, value),
  },
  [StorageUnits.MEGABYTE]: {
    name: "Megabyte",
    symbol: "MB",
    convertTo: (unit: StorageUnits, value: number): number => convertStorage(StorageUnits.MEGABYTE, unit, value),
  },
  [StorageUnits.GIGABYTE]: {
    name: "Gigabyte",
    symbol: "GB",
    convertTo: (unit: StorageUnits, value: number): number => convertStorage(StorageUnits.GIGABYTE, unit, value),
  },
  [StorageUnits.TERABYTE]: {
    name: "Terabyte",
    symbol: "TB",
    convertTo: (unit: StorageUnits, value: number): number => convertStorage(StorageUnits.TERABYTE, unit, value),
  },
  [StorageUnits.PETABYTE]: {
    name: "Petabyte",
    symbol: "PB",
    convertTo: (unit: StorageUnits, value: number): number => convertStorage(StorageUnits.PETABYTE, unit, value),
  },
} as const

export default STORAGE_UNITS
