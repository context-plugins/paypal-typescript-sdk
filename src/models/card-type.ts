import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Type of card. i.e Credit, Debit and so on. */
export const CardType = {
  /** A credit card. */
  Credit: "CREDIT",
  /** A debit card. */
  Debit: "DEBIT",
  /** A Prepaid card. */
  Prepaid: "PREPAID",
  /** A store card. */
  Store: "STORE",
  /** Card type cannot be determined. */
  Unknown: "UNKNOWN",
} as const;
export type CardType = (typeof CardType)[keyof typeof CardType] | (string & {});

export const cardTypeSchema: EnumSchema<CardType> = s.enumOf<CardType>(CardType);
