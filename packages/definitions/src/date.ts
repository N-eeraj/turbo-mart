/**
 * Date format types.
 *
 * @readonly
 * @enum
 *
 * @property ISO_8601 = 0 - ISO 8601 format (YYYY-MM-DD).
 * @property US_SHORT = 1 - US short format (MM/DD/YYYY).
 * @property US_SHORT_TEXT = 2 - US short text format (MMM DD, YYYY).
 * @property US_LONG = 3 - US long format (MMMM DD, YYYY).
 * @property EU_SHORT = 4 - European short format (DD/MM/YYYY).
 * @property EU_SHORT_TEXT = 5 - European short text format (DD MMM YYYY).
 * @property EU_LONG = 6 - European long format (DD MMMM YYYY).
 * @property DDMMYY_SLASH = 7 - Day/Month/Year short with slashes (DD/MM/YY).
 * @property MMDDYY_SLASH = 8 - Month/Day/Year short with slashes (MM/DD/YY).
 * @property DDMMYYYY_DASH = 9 - Day-Month-Year with dashes (DD-MM-YYYY).
 * @property MMDDYYYY_DASH = 10 - Month-Day-Year with dashes (MM-DD-YYYY).
 * @property DDMMYY_DASH = 11 - Day-Month-Year short with dashes (DD-MM-YY).
 * @property MMDDYY_DASH = 12 - Month-Day-Year short with dashes (MM-DD-YY).
 */
export enum DateFormats {
  ISO_8601,
  US_SHORT,
  US_SHORT_TEXT,
  US_LONG,
  EU_SHORT,
  EU_SHORT_TEXT,
  EU_LONG,
  DDMMYY_SLASH,
  MMDDYY_SLASH,
  DDMMYYYY_DASH,
  MMDDYYYY_DASH,
  DDMMYY_DASH,
  MMDDYY_DASH,
}

export type DateFormatMap = {
  [K in DateFormats]: string
}

export const DATE_FORMATS: DateFormatMap = {
  [DateFormats.ISO_8601]: "YYYY-MM-DD",
  [DateFormats.US_SHORT]: "MM/DD/YYYY",
  [DateFormats.US_SHORT_TEXT]: "MMM DD, YYYY",
  [DateFormats.US_LONG]: "MMMM DD, YYYY",
  [DateFormats.EU_SHORT]: "DD/MM/YYYY",
  [DateFormats.EU_SHORT_TEXT]: "DD MMM YYYY",
  [DateFormats.EU_LONG]: "DD MMMM YYYY",
  [DateFormats.DDMMYY_SLASH]: "DD/MM/YY",
  [DateFormats.MMDDYY_SLASH]: "MM/DD/YY",
  [DateFormats.DDMMYYYY_DASH]: "DD-MM-YYYY",
  [DateFormats.MMDDYYYY_DASH]: "MM-DD-YYYY",
  [DateFormats.DDMMYY_DASH]: "DD-MM-YY",
  [DateFormats.MMDDYY_DASH]: "MM-DD-YY",
} as const
