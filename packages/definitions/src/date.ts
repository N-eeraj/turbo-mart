export enum DateFormats {
  ISO_8601,              // YYYY-MM-DD
  US_SHORT,              // MM/DD/YYYY
  US_SHORT_TEXT,         // MMM DD, YYYY
  US_LONG,               // MMMM DD, YYYY
  EU_SHORT,              // DD/MM/YYYY
  EU_SHORT_TEXT,         // DD MMM YYYY
  EU_LONG,               // DD MMMM YYYY
  DDMMYY_SLASH,          // DD/MM/YY
  MMDDYY_SLASH,          // MM/DD/YY
  DDMMYYYY_DASH,         // DD-MM-YYYY
  MMDDYYYY_DASH,         // MM-DD-YYYY
  DDMMYY_DASH,           // DD-MM-YY
  MMDDYY_DASH,           // MM-DD-YY
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
