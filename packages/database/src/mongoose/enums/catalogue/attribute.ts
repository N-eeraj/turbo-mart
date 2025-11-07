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
