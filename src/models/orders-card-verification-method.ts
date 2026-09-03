import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const OrdersCardVerificationMethod = {
  ScaAlways: "SCA_ALWAYS",
  ScaWhenRequired: "SCA_WHEN_REQUIRED",
  _3DSecure: "3D_SECURE",
  AvsCvv: "AVS_CVV",
} as const;
export type OrdersCardVerificationMethod =
  | (typeof OrdersCardVerificationMethod)[keyof typeof OrdersCardVerificationMethod]
  | (string & {});

export const ordersCardVerificationMethodSchema: EnumSchema<OrdersCardVerificationMethod> =
  s.enumOf<OrdersCardVerificationMethod>(OrdersCardVerificationMethod);
