import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Electronic Commerce Indicator (ECI). The ECI value is part of the 2 data elements that indicate
 * the transaction was processed electronically. This should be passed on the authorization
 * transaction to the Gateway/Processor.
 */
export const EciFlag = {
  /** Mastercard non-3-D Secure transaction. */
  MastercardNon3DSecureTransaction: "MASTERCARD_NON_3D_SECURE_TRANSACTION",
  /** Mastercard attempted authentication transaction. */
  MastercardAttemptedAuthenticationTransaction: "MASTERCARD_ATTEMPTED_AUTHENTICATION_TRANSACTION",
  /** Mastercard fully authenticated transaction. */
  MastercardFullyAuthenticatedTransaction: "MASTERCARD_FULLY_AUTHENTICATED_TRANSACTION",
  /** VISA, AMEX, JCB, DINERS CLUB fully authenticated transaction. */
  FullyAuthenticatedTransaction: "FULLY_AUTHENTICATED_TRANSACTION",
  /** VISA, AMEX, JCB, DINERS CLUB attempted authentication transaction. */
  AttemptedAuthenticationTransaction: "ATTEMPTED_AUTHENTICATION_TRANSACTION",
  /** VISA, AMEX, JCB, DINERS CLUB non-3-D Secure transaction. */
  Non3DSecureTransaction: "NON_3D_SECURE_TRANSACTION",
} as const;
export type EciFlag = (typeof EciFlag)[keyof typeof EciFlag] | (string & {});

export const eciFlagSchema: EnumSchema<EciFlag> = s.enumOf<EciFlag>(EciFlag);
