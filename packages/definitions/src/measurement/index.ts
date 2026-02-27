import { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"

import LENGTH_UNITS, {
  convertLength,
} from "#measurement/data/length"
import AREA_UNITS, {
  convertArea,
} from "#measurement/data/area"
import type {
  ConversionFnMap,
  UnitsMap
} from "#measurement/types"


export const MEASUREMENT_UNITS: UnitsMap = {
  [MeasurementType.LENGTH]: LENGTH_UNITS,
  [MeasurementType.AREA]: AREA_UNITS,
} as const

export const UNIT_CONVERTER: ConversionFnMap = {
  [MeasurementType.LENGTH]: convertLength,
  [MeasurementType.AREA]: convertArea,
} as const

export {
  LENGTH_UNITS,
}
