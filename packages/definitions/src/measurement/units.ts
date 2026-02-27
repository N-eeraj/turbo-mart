/**
 * Units of measurement for length.
 *
 * @readonly
 * @enum
 *
 * @property MILLIMETER = 0 - Millimeter (mm).
 * @property CENTIMETER = 1 - Centimeter (cm).
 * @property METER = 2 - Meter (m).
 * @property KILOMETER = 3 - Kilometer (km).
 * @property INCH = 4 - Inch (in).
 * @property FOOT = 5 - Foot (ft).
 * @property YARD = 6 - Yard (yd).
 * @property MILE = 7 - Mile (mi).
 */
export enum LengthUnits {
  MILLIMETER,
  CENTIMETER,
  METER,
  KILOMETER,
  INCH,
  FOOT,
  YARD,
  MILE,
}

/**
 * Units of measurement for area.
 *
 * @readonly
 * @enum
 *
 * @property SQUARE_MILLIMETER = 0 - Square millimeter (mm²).
 * @property SQUARE_CENTIMETER = 1 - Square centimeter (cm²).
 * @property SQUARE_METER = 2 - Square meter (m²).
 * @property SQUARE_KILOMETER = 3 - Square kilometer (km²).
 * @property SQUARE_INCH = 4 - Square inch (in²).
 * @property SQUARE_FOOT = 5 - Square foot (ft²).
 * @property SQUARE_YARD = 6 - Square yard (yd²).
 * @property ACRE = 7 - Acre.
 * @property HECTARE = 8 - Hectare (ha).
 */
export enum AreaUnits {
  SQUARE_MILLIMETER,
  SQUARE_CENTIMETER,
  SQUARE_METER,
  SQUARE_KILOMETER,
  SQUARE_INCH,
  SQUARE_FOOT,
  SQUARE_YARD,
  ACRE,
  HECTARE,
}

/**
 * Units of measurement for volume.
 *
 * @readonly
 * @enum
 *
 * @property CUBIC_MILLIMETER = 0 - Cubic millimeter (mm³).
 * @property CUBIC_CENTIMETER = 1 - Cubic centimeter (cm³).
 * @property CUBIC_METER = 2 - Cubic meter (m³).
 * @property LITER = 3 - Liter (L).
 * @property MILLILITER = 4 - Milliliter (mL).
 * @property CUBIC_INCH = 5 - Cubic inch (in³).
 * @property CUBIC_FOOT = 6 - Cubic foot (ft³).
 * @property CUBIC_YARD = 7 - Cubic yard (yd³).
 * @property GALLON = 8 - Gallon (gal).
 */
export enum VolumeUnits {
  CUBIC_MILLIMETER,
  CUBIC_CENTIMETER,
  CUBIC_METER,
  LITER,
  MILLILITER,
  CUBIC_INCH,
  CUBIC_FOOT,
  CUBIC_YARD,
  GALLON,
}

/**
 * Units of measurement for weight (mass).
 *
 * @readonly
 * @enum
 *
 * @property MILLIGRAM = 0 - Milligram (mg).
 * @property GRAM = 1 - Gram (g).
 * @property KILOGRAM = 2 - Kilogram (kg).
 * @property METRIC_TON = 3 - Metric ton (t).
 * @property OUNCE = 4 - Ounce (oz).
 * @property POUND = 5 - Pound (lb).
 * @property TON = 6 - Short ton (US ton).
 */
export enum WeightUnits {
  MILLIGRAM,
  GRAM,
  KILOGRAM,
  METRIC_TON,
  OUNCE,
  POUND,
  TON,
}

/**
 * Units of measurement for time.
 *
 * @readonly
 * @enum
 *
 * @property MILLISECOND = 0 - Millisecond (ms).
 * @property SECOND = 1 - Second (s).
 * @property MINUTE = 2 - Minute (min).
 * @property HOUR = 3 - Hour (h).
 * @property DAY = 4 - Day (d).
 * @property WEEK = 5 - Week.
 */
export enum TimeUnits {
  MILLISECOND,
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  WEEK,
}

/**
 * Units of measurement for temperature.
 *
 * @readonly
 * @enum
 *
 * @property CELSIUS = 0 - Degree Celsius (°C).
 * @property FAHRENHEIT = 1 - Degree Fahrenheit (°F).
 * @property KELVIN = 2 - Kelvin (K).
 */
export enum TemperatureUnits {
  CELSIUS,
  FAHRENHEIT,
  KELVIN,
}

/**
 * Units of measurement for speed.
 *
 * @readonly
 * @enum
 *
 * @property METER_PER_SECOND = 0 - Meter per second (m/s).
 * @property KILOMETER_PER_HOUR = 1 - Kilometer per hour (km/h).
 * @property MILE_PER_HOUR = 2 - Mile per hour (mph).
 * @property FOOT_PER_SECOND = 3 - Foot per second (ft/s).
 * @property KNOT = 4 - Knot (nautical mile per hour).
 */
export enum SpeedUnits {
  METER_PER_SECOND,
  KILOMETER_PER_HOUR,
  MILE_PER_HOUR,
  FOOT_PER_SECOND,
  KNOT,
}

/**
 * Units of measurement for acceleration.
 *
 * @readonly
 * @enum
 *
 * @property METER_PER_SECOND_SQUARED = 0 - Meter per second squared (m/s²).
 * @property FOOT_PER_SECOND_SQUARED = 1 - Foot per second squared (ft/s²).
 * @property G_FORCE = 2 - Standard gravity (g).
 */
export enum AccelerationUnits {
  METER_PER_SECOND_SQUARED,
  FOOT_PER_SECOND_SQUARED,
  G_FORCE,
}

/**
 * Units of measurement for digital storage.
 *
 * @readonly
 * @enum
 *
 * @property BIT = 0 - Bit (b).
 * @property BYTE = 1 - Byte (B).
 * @property KILOBYTE = 2 - Kilobyte (KB).
 * @property MEGABYTE = 3 - Megabyte (MB).
 * @property GIGABYTE = 4 - Gigabyte (GB).
 * @property TERABYTE = 5 - Terabyte (TB).
 * @property PETABYTE = 6 - Petabyte (PB).
 */
export enum StorageUnits {
  BIT,
  BYTE,
  KILOBYTE,
  MEGABYTE,
  GIGABYTE,
  TERABYTE,
  PETABYTE,
}

/**
 * Units of measurement for data transfer rate.
 *
 * @readonly
 * @enum
 *
 * @property BITS_PER_SECOND = 0 - Bits per second (bps).
 * @property KILOBITS_PER_SECOND = 1 - Kilobits per second (kbps).
 * @property MEGABITS_PER_SECOND = 2 - Megabits per second (Mbps).
 * @property GIGABITS_PER_SECOND = 3 - Gigabits per second (Gbps).
 * @property BYTES_PER_SECOND = 4 - Bytes per second (B/s).
 */
export enum DataRateUnits {
  BITS_PER_SECOND,
  KILOBITS_PER_SECOND,
  MEGABITS_PER_SECOND,
  GIGABITS_PER_SECOND,
  BYTES_PER_SECOND,
}

/**
 * Units of measurement for energy.
 *
 * @readonly
 * @enum
 *
 * @property JOULE = 0 - Joule (J).
 * @property KILOJOULE = 1 - Kilojoule (kJ).
 * @property CALORIE = 2 - Calorie (cal).
 * @property KILOCALORIE = 3 - Kilocalorie (kcal).
 * @property WATT_HOUR = 4 - Watt-hour (Wh).
 * @property KILOWATT_HOUR = 5 - Kilowatt-hour (kWh).
 * @property ELECTRONVOLT = 6 - Electronvolt (eV).
 */
export enum EnergyUnits {
  JOULE,
  KILOJOULE,
  CALORIE,
  KILOCALORIE,
  WATT_HOUR,
  KILOWATT_HOUR,
  ELECTRONVOLT,
}

/**
 * Units of measurement for power.
 *
 * @readonly
 * @enum
 *
 * @property WATT = 0 - Watt (W).
 * @property KILOWATT = 1 - Kilowatt (kW).
 * @property MEGAWATT = 2 - Megawatt (MW).
 * @property GIGAWATT = 3 - Gigawatt (GW).
 * @property HORSEPOWER = 4 - Horsepower (hp).
 */
export enum PowerUnits {
  WATT,
  KILOWATT,
  MEGAWATT,
  GIGAWATT,
  HORSEPOWER,
}

/**
 * Units of measurement for pressure.
 *
 * @readonly
 * @enum
 *
 * @property PASCAL = 0 - Pascal (Pa).
 * @property KILOPASCAL = 1 - Kilopascal (kPa).
 * @property BAR = 2 - Bar.
 * @property PSI = 3 - Pounds per square inch (psi).
 * @property ATMOSPHERE = 4 - Standard atmosphere (atm).
 */
export enum PressureUnits {
  PASCAL,
  KILOPASCAL,
  BAR,
  PSI,
  ATMOSPHERE,
}

/**
 * Units of measurement for force.
 *
 * @readonly
 * @enum
 *
 * @property NEWTON = 0 - Newton (N).
 * @property KILONEWTON = 1 - Kilonewton (kN).
 * @property POUND_FORCE = 2 - Pound-force (lbf).
 */
export enum ForceUnits {
  NEWTON,
  KILONEWTON,
  POUND_FORCE,
}

/**
 * Units of measurement for frequency.
 *
 * @readonly
 * @enum
 *
 * @property HERTZ = 0 - Hertz (Hz).
 * @property KILOHERTZ = 1 - Kilohertz (kHz).
 * @property MEGAHERTZ = 2 - Megahertz (MHz).
 * @property GIGAHERTZ = 3 - Gigahertz (GHz).
 */
export enum FrequencyUnits {
  HERTZ,
  KILOHERTZ,
  MEGAHERTZ,
  GIGAHERTZ,
}

/**
 * Units of measurement for angle.
 *
 * @readonly
 * @enum
 *
 * @property DEGREE = 0 - Degree (°).
 * @property RADIAN = 1 - Radian (rad).
 * @property GRADIAN = 2 - Gradian (gon).
 * @property ARCSECOND = 3 - Arcsecond (").
 */
export enum AngleUnits {
  DEGREE,
  RADIAN,
  GRADIAN,
  ARCSECOND,
}

/**
 * Units of measurement for density.
 *
 * @readonly
 * @enum
 *
 * @property KILOGRAM_PER_CUBIC_METER = 0 - Kilogram per cubic meter (kg/m³).
 * @property GRAM_PER_CUBIC_CENTIMETER = 1 - Gram per cubic centimeter (g/cm³).
 * @property POUND_PER_CUBIC_FOOT = 2 - Pound per cubic foot (lb/ft³).
 */
export enum DensityUnits {
  KILOGRAM_PER_CUBIC_METER,
  GRAM_PER_CUBIC_CENTIMETER,
  POUND_PER_CUBIC_FOOT,
}

/**
 * Units of measurement for volumetric flow rate.
 *
 * @readonly
 * @enum
 *
 * @property CUBIC_METER_PER_SECOND = 0 - Cubic meter per second (m³/s).
 * @property LITER_PER_SECOND = 1 - Liter per second (L/s).
 * @property LITER_PER_MINUTE = 2 - Liter per minute (L/min).
 * @property GALLON_PER_MINUTE = 3 - Gallon per minute (GPM).
 */
export enum FlowRateUnits {
  CUBIC_METER_PER_SECOND,
  LITER_PER_SECOND,
  LITER_PER_MINUTE,
  GALLON_PER_MINUTE,
}

/**
 * Units of measurement for voltage.
 *
 * @readonly
 * @enum
 *
 * @property MILLIVOLT = 0 - Millivolt (mV).
 * @property VOLT = 1 - Volt (V).
 * @property KILOVOLT = 2 - Kilovolt (kV).
 */
export enum VoltageUnits {
  MILLIVOLT,
  VOLT,
  KILOVOLT,
}

/**
 * Units of measurement for electrical current.
 *
 * @readonly
 * @enum
 *
 * @property MICROAMPERE = 0 - Microampere (µA).
 * @property MILLIAMPERE = 1 - Milliampere (mA).
 * @property AMPERE = 2 - Ampere (A).
 * @property KILOAMPERE = 3 - Kiloampere (kA).
 */
export enum CurrentUnits {
  MICROAMPERE,
  MILLIAMPERE,
  AMPERE,
  KILOAMPERE,
}

/**
 * Units of measurement for electrical resistance.
 *
 * @readonly
 * @enum
 *
 * @property OHM = 0 - Ohm (Ω).
 * @property KILO_OHM = 1 - Kilo ohm (kΩ).
 * @property MEGA_OHM = 2 - Mega ohm (MΩ).
 */
export enum ResistanceUnits {
  OHM,
  KILO_OHM,
  MEGA_OHM,
}

/**
 * Units of measurement for sound level.
 *
 * @readonly
 * @enum
 *
 * @property DECIBEL = 0 - Decibel (dB).
 */
export enum SoundLevelUnits {
  DECIBEL,
}

/**
 * Units of measurement for percentage and proportional values.
 *
 * @readonly
 * @enum
 *
 * @property PERCENT = 0 - Percent (%).
 * @property PER_MILLE = 1 - Per mille (‰).
 */
export enum PercentageUnits {
  PERCENT,
  PER_MILLE,
}

/**
 * Units of measurement for torque.
 *
 * @readonly
 * @enum
 *
 * @property NEWTON_METER = 0 - Newton meter (N·m).
 * @property POUND_FOOT = 1 - Pound-foot (lb·ft).
 */
export enum TorqueUnits {
  NEWTON_METER,
  POUND_FOOT,
}

/**
 * Units of measurement for fuel economy.
 *
 * @readonly
 * @enum
 *
 * @property KILOMETER_PER_LITER = 0 - Kilometer per liter (km/L).
 * @property LITER_PER_100_KILOMETERS = 1 - Liter per 100 kilometers (L/100km).
 * @property MILE_PER_GALLON = 2 - Miles per gallon (MPG).
 */
export enum FuelEconomyUnits {
  KILOMETER_PER_LITER,
  LITER_PER_100_KILOMETERS,
  MILE_PER_GALLON,
}
