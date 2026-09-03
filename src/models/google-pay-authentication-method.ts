import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const GooglePayAuthenticationMethod = {
  PanOnly: "PAN_ONLY",
  Cryptogram3Ds: "CRYPTOGRAM_3DS",
} as const;
export type GooglePayAuthenticationMethod =
  | (typeof GooglePayAuthenticationMethod)[keyof typeof GooglePayAuthenticationMethod]
  | (string & {});

export const googlePayAuthenticationMethodSchema: EnumSchema<GooglePayAuthenticationMethod> =
  s.enumOf<GooglePayAuthenticationMethod>(GooglePayAuthenticationMethod);
