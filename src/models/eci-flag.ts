import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const EciFlag = {
  MastercardNon3DSecureTransaction: "MASTERCARD_NON_3D_SECURE_TRANSACTION",
  MastercardAttemptedAuthenticationTransaction: "MASTERCARD_ATTEMPTED_AUTHENTICATION_TRANSACTION",
  MastercardFullyAuthenticatedTransaction: "MASTERCARD_FULLY_AUTHENTICATED_TRANSACTION",
  FullyAuthenticatedTransaction: "FULLY_AUTHENTICATED_TRANSACTION",
  AttemptedAuthenticationTransaction: "ATTEMPTED_AUTHENTICATION_TRANSACTION",
  Non3DSecureTransaction: "NON_3D_SECURE_TRANSACTION",
} as const;
export type EciFlag = (typeof EciFlag)[keyof typeof EciFlag] | (string & {});

export const eciFlagSchema: EnumSchema<EciFlag> = s.enumOf<EciFlag>(EciFlag);
