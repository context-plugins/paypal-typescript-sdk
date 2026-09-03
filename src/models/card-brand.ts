import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const CardBrand = {
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
  CarteBancaire: "CARTE_BANCAIRE",
  StarAccess: "STAR_ACCESS",
  Pulse: "PULSE",
  Nyce: "NYCE",
  Accel: "ACCEL",
  Unknown: "UNKNOWN",
} as const;
export type CardBrand = (typeof CardBrand)[keyof typeof CardBrand] | (string & {});

export const cardBrandSchema: EnumSchema<CardBrand> = s.enumOf<CardBrand>(CardBrand);
