import type {
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"

import {
  SoundLevelUnits,
} from "#measurement/units"
import type {
  UnitsEnumMapValue,
  ConversionFn,
} from "#measurement/types"

/**
 * Convert a sound level value from one unit to another.
 * Since Decibel is the only unit, it returns the value directly.
 */
export const convertSoundLevel: ConversionFn<MeasurementType.SOUND_LEVEL> = (_from, _to, value) => {
  return value
}

const SOUND_LEVEL_UNITS: UnitsEnumMapValue<SoundLevelUnits> = {
  [SoundLevelUnits.DECIBEL]: {
    name: "Decibel",
    symbol: "dB",
    convertTo: (_unit: SoundLevelUnits, value: number): number => value,
  },
} as const

export default SOUND_LEVEL_UNITS
