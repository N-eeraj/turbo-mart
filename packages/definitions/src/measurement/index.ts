import {
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"

import LENGTH_UNITS, {
  convertLength,
} from "#measurement/data/length"
import AREA_UNITS, {
  convertArea,
} from "#measurement/data/area"
import WEIGHT_UNITS, {
  convertWeight,
} from "#measurement/data/weight"
import TIME_UNITS, {
  convertTime,
} from "#measurement/data/time"
import VOLUME_UNITS, {
  convertVolume,
} from "#measurement/data/volume"
import TEMPERATURE_UNITS, {
  convertTemperature,
} from "#measurement/data/temperature"
import SPEED_UNITS, {
  convertSpeed,
} from "#measurement/data/speed"
import ACCELERATION_UNITS, {
  convertAcceleration,
} from "#measurement/data/acceleration"
import STORAGE_UNITS, {
  convertStorage,
} from "#measurement/data/storage"
import DATA_RATE_UNITS, {
  convertDataRate,
} from "#measurement/data/dataRate"
import ENERGY_UNITS, {
  convertEnergy,
} from "#measurement/data/energy"
import POWER_UNITS, {
  convertPower,
} from "#measurement/data/power"
import PRESSURE_UNITS, {
  convertPressure,
} from "#measurement/data/pressure"
import FORCE_UNITS, {
  convertForce,
} from "#measurement/data/force"
import FREQUENCY_UNITS, {
  convertFrequency,
} from "#measurement/data/frequency"
import ANGLE_UNITS, {
  convertAngle,
} from "#measurement/data/angle"
import DENSITY_UNITS, {
  convertDensity,
} from "#measurement/data/density"
import FLOW_RATE_UNITS, {
  convertFlowRate,
} from "#measurement/data/flowRate"
import VOLTAGE_UNITS, {
  convertVoltage,
} from "#measurement/data/voltage"
import CURRENT_UNITS, {
  convertCurrent,
} from "#measurement/data/current"
import RESISTANCE_UNITS, {
  convertResistance,
} from "#measurement/data/resistance"
import SOUND_LEVEL_UNITS, {
  convertSoundLevel,
} from "#measurement/data/soundLevel"
import PERCENTAGE_UNITS, {
  convertPercentage,
} from "#measurement/data/percentage"
import TORQUE_UNITS, {
  convertTorque,
} from "#measurement/data/torque"
import FUEL_ECONOMY_UNITS, {
  convertFuelEconomy,
} from "#measurement/data/fuelEconomy"

import type {
  ConversionFnMap,
  UnitsMap,
} from "#measurement/types"

export const MEASUREMENT_UNITS: UnitsMap = {
  [MeasurementType.LENGTH]: LENGTH_UNITS,
  [MeasurementType.AREA]: AREA_UNITS,
  [MeasurementType.VOLUME]: VOLUME_UNITS,
  [MeasurementType.WEIGHT]: WEIGHT_UNITS,
  [MeasurementType.TIME]: TIME_UNITS,
  [MeasurementType.TEMPERATURE]: TEMPERATURE_UNITS,
  [MeasurementType.SPEED]: SPEED_UNITS,
  [MeasurementType.ACCELERATION]: ACCELERATION_UNITS,
  [MeasurementType.STORAGE]: STORAGE_UNITS,
  [MeasurementType.DATA_RATE]: DATA_RATE_UNITS,
  [MeasurementType.ENERGY]: ENERGY_UNITS,
  [MeasurementType.POWER]: POWER_UNITS,
  [MeasurementType.PRESSURE]: PRESSURE_UNITS,
  [MeasurementType.FORCE]: FORCE_UNITS,
  [MeasurementType.FREQUENCY]: FREQUENCY_UNITS,
  [MeasurementType.ANGLE]: ANGLE_UNITS,
  [MeasurementType.DENSITY]: DENSITY_UNITS,
  [MeasurementType.FLOW_RATE]: FLOW_RATE_UNITS,
  [MeasurementType.VOLTAGE]: VOLTAGE_UNITS,
  [MeasurementType.CURRENT]: CURRENT_UNITS,
  [MeasurementType.RESISTANCE]: RESISTANCE_UNITS,
  [MeasurementType.SOUND_LEVEL]: SOUND_LEVEL_UNITS,
  [MeasurementType.PERCENTAGE]: PERCENTAGE_UNITS,
  [MeasurementType.TORQUE]: TORQUE_UNITS,
  [MeasurementType.FUEL_ECONOMY]: FUEL_ECONOMY_UNITS,
} as const

export const UNIT_CONVERTER: ConversionFnMap = {
  [MeasurementType.LENGTH]: convertLength,
  [MeasurementType.AREA]: convertArea,
  [MeasurementType.VOLUME]: convertVolume,
  [MeasurementType.WEIGHT]: convertWeight,
  [MeasurementType.TIME]: convertTime,
  [MeasurementType.TEMPERATURE]: convertTemperature,
  [MeasurementType.SPEED]: convertSpeed,
  [MeasurementType.ACCELERATION]: convertAcceleration,
  [MeasurementType.STORAGE]: convertStorage,
  [MeasurementType.DATA_RATE]: convertDataRate,
  [MeasurementType.ENERGY]: convertEnergy,
  [MeasurementType.POWER]: convertPower,
  [MeasurementType.PRESSURE]: convertPressure,
  [MeasurementType.FORCE]: convertForce,
  [MeasurementType.FREQUENCY]: convertFrequency,
  [MeasurementType.ANGLE]: convertAngle,
  [MeasurementType.DENSITY]: convertDensity,
  [MeasurementType.FLOW_RATE]: convertFlowRate,
  [MeasurementType.VOLTAGE]: convertVoltage,
  [MeasurementType.CURRENT]: convertCurrent,
  [MeasurementType.RESISTANCE]: convertResistance,
  [MeasurementType.SOUND_LEVEL]: convertSoundLevel,
  [MeasurementType.PERCENTAGE]: convertPercentage,
  [MeasurementType.TORQUE]: convertTorque,
  [MeasurementType.FUEL_ECONOMY]: convertFuelEconomy,
} as const

export {
  LENGTH_UNITS,
  VOLUME_UNITS,
  WEIGHT_UNITS,
  TIME_UNITS,
  TEMPERATURE_UNITS,
  SPEED_UNITS,
  ACCELERATION_UNITS,
  STORAGE_UNITS,
  DATA_RATE_UNITS,
  ENERGY_UNITS,
  POWER_UNITS,
  PRESSURE_UNITS,
  FORCE_UNITS,
  FREQUENCY_UNITS,
  ANGLE_UNITS,
  DENSITY_UNITS,
  FLOW_RATE_UNITS,
  VOLTAGE_UNITS,
  CURRENT_UNITS,
  RESISTANCE_UNITS,
  SOUND_LEVEL_UNITS,
  PERCENTAGE_UNITS,
  TORQUE_UNITS,
  FUEL_ECONOMY_UNITS,
}
