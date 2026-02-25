import {
  AttributeType,
  MeasurementType,
} from "@app/database/mongoose/models/Catalogue/Attributes"

type EnumValueMap<
  TEnum extends string | number,
  TMap extends Record<TEnum, unknown>
> = {
  [Key in keyof TMap[TEnum]]: TMap[TEnum][Key]
} & {
  value: TEnum
}

export type AttributeMap = typeof ATTRIBUTE_TYPES_MAP
export type AttributeTypeMap = EnumValueMap<AttributeType, AttributeMap>

export type MeasurementMap = typeof MEASUREMENT_TYPES_MAP
export type MeasurementTypeMap = EnumValueMap<MeasurementType, MeasurementMap>

export const ATTRIBUTE_TYPES_MAP = {
  [AttributeType.TEXT]: {
    name: "Text",
  },
  [AttributeType.NUMBER]: {
    name: "Number",
  },
  [AttributeType.BOOLEAN]: {
    name: "Boolean",
  },
  [AttributeType.SELECT]: {
    name: "Select",
  },
  [AttributeType.MULTI_SELECT]: {
    name: "Multi Select",
  },
  [AttributeType.COLOR]: {
    name: "Color",
  },
  [AttributeType.DATE]: {
    name: "Date",
  },
  [AttributeType.JSON]: {
    name: "Key Values",
  },
} as const

export const MEASUREMENT_TYPES_MAP = {
  [MeasurementType.NUMBER]: {
    name: "Number",
    description: "A numeric value that may or may not have a unit (e.g., counts, mAh, rating).",
  },
  [MeasurementType.LENGTH]: {
    name: "Length",
    description: "Measures how long something is (e.g., cm, inches, meters).",
  },
  [MeasurementType.AREA]: {
    name: "Area",
    description: "Measures the size of a surface (e.g., m², ft², acres).",
  },
  [MeasurementType.VOLUME]: {
    name: "Volume",
    description: "Measures how much space something takes up (e.g., liters, cubic meters).",
  },
  [MeasurementType.WEIGHT]: {
    name: "Weight",
    description: "Measures how heavy something is (e.g., grams, kilograms, pounds).",
  },
  [MeasurementType.TIME]: {
    name: "Time",
    description: "Measures how long something lasts or takes (e.g., seconds, hours, days).",
  },
  [MeasurementType.TEMPERATURE]: {
    name: "Temperature",
    description: "Measures how hot or cold something is (e.g., °C, °F).",
  },
  [MeasurementType.SPEED]: {
    name: "Speed",
    description: "Measures how fast something moves (e.g., km/h, mph).",
  },
  [MeasurementType.ACCELERATION]: {
    name: "Acceleration",
    description: "Measures how quickly speed changes (e.g., m/s²).",
  },
  [MeasurementType.STORAGE]: {
    name: "Storage",
    description: "Measures digital storage size (e.g., MB, GB, TB).",
  },
  [MeasurementType.DATA_RATE]: {
    name: "Data Rate",
    description: "Measures how fast data is transferred (e.g., MB/s, Mbps).",
  },
  [MeasurementType.ENERGY]: {
    name: "Energy",
    description: "Measures the amount of energy something contains or uses (e.g., Joules, kWh).",
  },
  [MeasurementType.POWER]: {
    name: "Power",
    description: "Measures how much energy is used over time (e.g., Watts, kW).",
  },
  [MeasurementType.PRESSURE]: {
    name: "Pressure",
    description: "Measures how much force is applied over an area (e.g., Pascal, PSI).",
  },
  [MeasurementType.FORCE]: {
    name: "Force",
    description: "Measures push or pull (e.g., Newtons, pounds).",
  },
  [MeasurementType.FREQUENCY]: {
    name: "Frequency",
    description: "Measures how often something happens in a certain time (e.g., Hz).",
  },
  [MeasurementType.ANGLE]: {
    name: "Angle",
    description: "Measures rotation or tilt (e.g., degrees, radians).",
  },
  [MeasurementType.DENSITY]: {
    name: "Density",
    description: "Measures how heavy something is for its size (e.g., kg/m³, g/cm³).",
  },
  [MeasurementType.FLOW_RATE]: {
    name: "Flow Rate",
    description: "Measures how much liquid or gas moves in a certain time (e.g., L/min, m³/h).",
  },
  [MeasurementType.VOLTAGE]: {
    name: "Voltage",
    description: "Measures electrical pressure (e.g., Volts).",
  },
  [MeasurementType.CURRENT]: {
    name: "Current",
    description: "Measures the flow of electricity (e.g., Amperes).",
  },
  [MeasurementType.RESISTANCE]: {
    name: "Resistance",
    description: "Measures how much something resists electricity (e.g., Ohms).",
  },
  [MeasurementType.SOUND_LEVEL]: {
    name: "Sound Level",
    description: "Measures how loud something is (e.g., decibels).",
  },
  [MeasurementType.PERCENTAGE]: {
    name: "Percentage",
    description: "Represents a part of a whole as a percent (%).",
  },
  [MeasurementType.TORQUE]: {
    name: "Torque",
    description: "Measures twisting force (e.g., Nm, lb-ft).",
  },
  [MeasurementType.FUEL_ECONOMY]: {
    name: "Fuel Economy",
    description: "Measures how far something can travel per unit of fuel (e.g., km/L, mpg).",
  },
} as const
