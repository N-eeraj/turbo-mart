import type {
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"

import {
  StorageUnits,
} from "#measurement/units"
import type {
  UnitsEnumMapValue,
  ConversionFn,
} from "#measurement/types"

// Conversion factors relative to bit
const STORAGE_CONVERSION_FACTORS: Record<StorageUnits, number> = {
  [StorageUnits.BIT]: 1,
  [StorageUnits.BYTE]: 8, // 1 Byte = 8 bits
  [StorageUnits.KILOBYTE]: 8192, // KB => 8 * 1024 bits,
  [StorageUnits.MEGABYTE]: 8_388_608, // MB => 8 * 1024 * 1024 bits,
  [StorageUnits.GIGABYTE]: 8_589_934_592, // GB => 8 * 1024 * 1024 * 1024 bits,
  [StorageUnits.TERABYTE]: 8_796_093_022_208, // TB => 8 * 1024 * 1024 * 1024 * 1024 bits,
  [StorageUnits.PETABYTE]: 9_007_199_254_740_992, // PB => 8 * 1024 * 1024 * 1024 * 1024 * 1024 bits,
}

/**
 * Convert a storage value from one unit to another.
 */
export const convertStorage: ConversionFn<MeasurementType.STORAGE> = (from, to, value) => {
  const fromFactor = STORAGE_CONVERSION_FACTORS[from]
  const toFactor = STORAGE_CONVERSION_FACTORS[to]
  return (value * fromFactor) / toFactor
}

const STORAGE_UNITS: UnitsEnumMapValue<StorageUnits> = {
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
