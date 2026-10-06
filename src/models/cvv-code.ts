import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The card verification value code for for Visa, Discover, Mastercard, or American Express. */
export const CvvCode = {
  /**
   * For Visa, Mastercard, Discover, or American Express, error - unrecognized or unknown response.
   */
  E: "E",
  /** For Visa, Mastercard, Discover, or American Express, invalid or null. */
  I: "I",
  /** For Visa, Mastercard, Discover, or American Express, the CVV2/CSC matches. */
  M: "M",
  /** For Visa, Mastercard, Discover, or American Express, the CVV2/CSC does not match. */
  N: "N",
  /** For Visa, Mastercard, Discover, or American Express, it was not processed. */
  P: "P",
  /** For Visa, Mastercard, Discover, or American Express, the service is not supported. */
  S: "S",
  /** For Visa, Mastercard, Discover, or American Express, unknown - the issuer is not certified. */
  U: "U",
  /**
   * For Visa, Mastercard, Discover, or American Express, no response. For Maestro, the service is
   * not available.
   */
  X: "X",
  /** For Visa, Mastercard, Discover, or American Express, error. */
  AllOthers: "All others",
  /** For Maestro, the CVV2 matched. */
  _0: "0",
  /** For Maestro, the CVV2 did not match. */
  _1: "1",
  /** For Maestro, the merchant has not implemented CVV2 code handling. */
  _2: "2",
  /** For Maestro, the merchant has indicated that CVV2 is not present on card. */
  _3: "3",
  /** For Maestro, the service is not available. */
  _4: "4",
} as const;
export type CvvCode = (typeof CvvCode)[keyof typeof CvvCode] | (string & {});

export const cvvCodeSchema: EnumSchema<CvvCode> = s.enumOf<CvvCode>(CvvCode);
