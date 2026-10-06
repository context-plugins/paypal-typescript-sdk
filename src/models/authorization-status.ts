import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The status for the authorized payment. */
export const AuthorizationStatus = {
  /**
   * The authorized payment is created. No captured payments have been made for this authorized
   * payment.
   */
  Created: "CREATED",
  /**
   * The authorized payment has one or more captures against it. The sum of these captured payments
   * is greater than the amount of the original authorized payment.
   */
  Captured: "CAPTURED",
  /** PayPal cannot authorize funds for this authorized payment. */
  Denied: "DENIED",
  /**
   * A captured payment was made for the authorized payment for an amount that is less than the
   * amount of the original authorized payment.
   */
  PartiallyCaptured: "PARTIALLY_CAPTURED",
  /**
   * The authorized payment was voided. No more captured payments can be made against this
   * authorized payment.
   */
  Voided: "VOIDED",
  /** The created authorization is in pending state. For more information, see status.details. */
  Pending: "PENDING",
} as const;
export type AuthorizationStatus =
  | (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus]
  | (string & {});

export const authorizationStatusSchema: EnumSchema<AuthorizationStatus> =
  s.enumOf<AuthorizationStatus>(AuthorizationStatus);
