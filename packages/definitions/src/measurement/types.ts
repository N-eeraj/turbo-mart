import { MeasurementType } from "@app/database/mongoose/enums/catalogue/attribute"
import {
  LengthUnits,
  AreaUnits,
  VolumeUnits,
  WeightUnits,
  TimeUnits,
  TemperatureUnits,
  SpeedUnits,
  AccelerationUnits,
  StorageUnits,
  DataRateUnits,
  EnergyUnits,
  PowerUnits,
  PressureUnits,
  ForceUnits,
  FrequencyUnits,
  AngleUnits,
  DensityUnits,
  FlowRateUnits,
  VoltageUnits,
  CurrentUnits,
  ResistanceUnits,
  SoundLevelUnits,
  PercentageUnits,
  TorqueUnits,
  FuelEconomyUnits,
} from "#measurement/units"

type MeasurementUnitEnumMap = {
  [MeasurementType.LENGTH]: LengthUnits
  [MeasurementType.AREA]: AreaUnits
  [MeasurementType.VOLUME]: VolumeUnits
  [MeasurementType.WEIGHT]: WeightUnits
  [MeasurementType.TIME]: TimeUnits
  [MeasurementType.TEMPERATURE]: TemperatureUnits
  [MeasurementType.SPEED]: SpeedUnits
  [MeasurementType.ACCELERATION]: AccelerationUnits
  [MeasurementType.STORAGE]: StorageUnits
  [MeasurementType.DATA_RATE]: DataRateUnits
  [MeasurementType.ENERGY]: EnergyUnits
  [MeasurementType.POWER]: PowerUnits
  [MeasurementType.PRESSURE]: PressureUnits
  [MeasurementType.FORCE]: ForceUnits
  [MeasurementType.FREQUENCY]: FrequencyUnits
  [MeasurementType.ANGLE]: AngleUnits
  [MeasurementType.DENSITY]: DensityUnits
  [MeasurementType.FLOW_RATE]: FlowRateUnits
  [MeasurementType.VOLTAGE]: VoltageUnits
  [MeasurementType.CURRENT]: CurrentUnits
  [MeasurementType.RESISTANCE]: ResistanceUnits
  [MeasurementType.SOUND_LEVEL]: SoundLevelUnits
  [MeasurementType.PERCENTAGE]: PercentageUnits
  [MeasurementType.TORQUE]: TorqueUnits
  [MeasurementType.FUEL_ECONOMY]: FuelEconomyUnits
}

export type ConversionFn<TMeasurementType extends keyof UnitsMap> = (
  _from: keyof UnitsMap[TMeasurementType],
  _to: keyof UnitsMap[TMeasurementType],
  _value: number
) => number

export interface MeasurementUnitData<TMeasurementUnit> {
  name: string
  symbol: string
  convertTo: (_unit: TMeasurementUnit, _value: number) => number
}

export type UnitsMap = {
  [K in keyof MeasurementUnitEnumMap]: Record<
    MeasurementUnitEnumMap[K],
    MeasurementUnitData<MeasurementUnitEnumMap[K]>
  >
}

export type ConversionFnMap = {
  [K in keyof MeasurementUnitEnumMap]: ConversionFn<K>
}
