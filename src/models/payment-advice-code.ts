import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PaymentAdviceCode = {
  _01: "01",
  _02: "02",
  _03: "03",
  _04: "04",
  _21: "21",
  _22: "22",
  _24: "24",
  _25: "25",
  _26: "26",
  _27: "27",
  _28: "28",
  _29: "29",
  _30: "30",
  _40: "40",
  _43: "43",
} as const;
export type PaymentAdviceCode = (typeof PaymentAdviceCode)[keyof typeof PaymentAdviceCode] | (string & {});

export const paymentAdviceCodeSchema: EnumSchema<PaymentAdviceCode> =
  s.enumOf<PaymentAdviceCode>(PaymentAdviceCode);
