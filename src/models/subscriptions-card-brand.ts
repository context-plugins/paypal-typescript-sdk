import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const SubscriptionsCardBrand = {
  Visa: "VISA",
  Mastercard: "MASTERCARD",
  Discover: "DISCOVER",
  Amex: "AMEX",
  Solo: "SOLO",
  Jcb: "JCB",
  Star: "STAR",
  Delta: "DELTA",
  Switch: "SWITCH",
  Maestro: "MAESTRO",
  CbNationale: "CB_NATIONALE",
  Configoga: "CONFIGOGA",
  Confidis: "CONFIDIS",
  Electron: "ELECTRON",
  Cetelem: "CETELEM",
  ChinaUnionPay: "CHINA_UNION_PAY",
  Diners: "DINERS",
  Elo: "ELO",
  Hiper: "HIPER",
  Hipercard: "HIPERCARD",
  Rupay: "RUPAY",
  Ge: "GE",
  Synchrony: "SYNCHRONY",
  Eftpos: "EFTPOS",
  Unknown: "UNKNOWN",
} as const;
export type SubscriptionsCardBrand =
  | (typeof SubscriptionsCardBrand)[keyof typeof SubscriptionsCardBrand]
  | (string & {});

export const subscriptionsCardBrandSchema: EnumSchema<SubscriptionsCardBrand> =
  s.enumOf<SubscriptionsCardBrand>(SubscriptionsCardBrand);
