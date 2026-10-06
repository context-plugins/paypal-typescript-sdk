import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The card network or brand. Applies to credit, debit, gift, and payment cards. */
export const CardBrand = {
  /** Visa card. */
  Visa: "VISA",
  /** Mastercard card. */
  Mastercard: "MASTERCARD",
  /** Discover card. */
  Discover: "DISCOVER",
  /** American Express card. */
  Amex: "AMEX",
  /** Solo debit card. */
  Solo: "SOLO",
  /** Japan Credit Bureau card. */
  Jcb: "JCB",
  /** Military Star card. */
  Star: "STAR",
  /** Delta Airlines card. */
  Delta: "DELTA",
  /** Switch credit card. */
  Switch: "SWITCH",
  /** Maestro credit card. */
  Maestro: "MAESTRO",
  /** Carte Bancaire (CB) credit card. */
  CbNationale: "CB_NATIONALE",
  /** Configoga credit card. */
  Configoga: "CONFIGOGA",
  /** Confidis credit card. */
  Confidis: "CONFIDIS",
  /** Visa Electron credit card. */
  Electron: "ELECTRON",
  /** Cetelem credit card. */
  Cetelem: "CETELEM",
  /** China union pay credit card. */
  ChinaUnionPay: "CHINA_UNION_PAY",
  /**
   * The Diners Club International banking and payment services capability network owned by Discover
   * Financial Services (DFS), one of the most recognized brands in US financial services.
   */
  Diners: "DINERS",
  /** The Brazilian Elo card payment network. */
  Elo: "ELO",
  /** The Hiper - Ingenico ePayment network. */
  Hiper: "HIPER",
  /** The Brazilian Hipercard payment network that's widely accepted in the retail market. */
  Hipercard: "HIPERCARD",
  /** The RuPay payment network. */
  Rupay: "RUPAY",
  /** The GE Credit Union 3Point card payment network. */
  Ge: "GE",
  /** The Synchrony Financial (SYF) payment network. */
  Synchrony: "SYNCHRONY",
  /** The Electronic Fund Transfer At Point of Sale(EFTPOS) Debit card payment network. */
  Eftpos: "EFTPOS",
  /** The Carte Bancaire payment network. */
  CarteBancaire: "CARTE_BANCAIRE",
  /** The Star Access payment network. */
  StarAccess: "STAR_ACCESS",
  /** The Pulse payment network. */
  Pulse: "PULSE",
  /** The NYCE payment network. */
  Nyce: "NYCE",
  /** The Accel payment network. */
  Accel: "ACCEL",
  /** UNKNOWN payment network. */
  Unknown: "UNKNOWN",
} as const;
export type CardBrand = (typeof CardBrand)[keyof typeof CardBrand] | (string & {});

export const cardBrandSchema: EnumSchema<CardBrand> = s.enumOf<CardBrand>(CardBrand);
