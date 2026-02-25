/**
 * Types for subcategory attributes.
 *
 * @readonly
 * @enum
 * 
 * @property TEXT = 0 - Free-form text input.
 * @property NUMBER = 1 - Numeric value.
 * @property BOOLEAN = 2 - Boolean value.
 * @property SELECT = 3 - Single option from a predefined list.
 * @property MULTI_SELECT = 4 - Multiple options from a predefined list.
 * @property COLOR = 5 - Color value, that attributes that require color picker/swatches.
 * @property DATE = 6 - Date or timestamp value.
 * @property JSON = 7 - Structured data stored as a key value JSON object.
 */
export enum AttributeType {
  TEXT,
  NUMBER,
  BOOLEAN,
  SELECT,
  MULTI_SELECT,
  COLOR,
  DATE,
  JSON,
}

/**
 * Types of measurable values for number attribute.
 *
 * @readonly
 * @enum
 * 
 * @property NUMBER = 0 - Unitless numeric value (count, quantity).
 * @property LENGTH = 1 - Distance or linear measurement.
 * @property AREA = 2 - Surface measurement.
 * @property VOLUME = 3 - Space or capacity measurement.
 * @property WEIGHT = 4 - Mass measurement.
 * @property TIME = 5 - Duration measurement.
 * @property TEMPERATURE = 6 - Heat measurement.
 * @property SPEED = 7 - Distance over time.
 * @property ACCELERATION = 8 - Change in speed over time.
 * @property STORAGE = 9 - Digital data size.
 * @property DATA_RATE = 10 - Data transfer per time unit.
 * @property ENERGY = 11 - Work or energy measurement.
 * @property POWER = 12 - Energy per time unit.
 * @property PRESSURE = 13 - Force per area.
 * @property FORCE = 14 - Push or pull force.
 * @property FREQUENCY = 15 - Repetition rate.
 * @property ANGLE = 16 - Rotational measurement.
 * @property DENSITY = 17 - Mass per volume.
 * @property FLOW_RATE = 18 - Volume per time unit.
 * @property VOLTAGE = 19 - Electrical potential difference.
 * @property CURRENT = 20 - Electrical current flow.
 * @property RESISTANCE = 21 - Electrical resistance.
 * @property SOUND_LEVEL = 22 - Sound intensity level.
 * @property PERCENTAGE = 23 - Proportional numeric value.
 * @property TORQUE = 24 - Rotational force.
 * @property FUEL_ECONOMY = 25 - Distance per fuel unit.
 */
export enum MeasurementType {
  NUMBER,
  LENGTH,
  AREA,
  VOLUME,
  WEIGHT,
  TIME,
  TEMPERATURE,
  SPEED,
  ACCELERATION,
  STORAGE,
  DATA_RATE,
  ENERGY,
  POWER,
  PRESSURE,
  FORCE,
  FREQUENCY,
  ANGLE,
  DENSITY,
  FLOW_RATE,
  VOLTAGE,
  CURRENT,
  RESISTANCE,
  SOUND_LEVEL,
  PERCENTAGE,
  TORQUE,
  FUEL_ECONOMY,
}