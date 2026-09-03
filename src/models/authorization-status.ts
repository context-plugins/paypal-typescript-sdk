import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const AuthorizationStatus = {
  Created: "CREATED",
  Captured: "CAPTURED",
  Denied: "DENIED",
  PartiallyCaptured: "PARTIALLY_CAPTURED",
  Voided: "VOIDED",
  Pending: "PENDING",
} as const;
export type AuthorizationStatus =
  | (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus]
  | (string & {});

export const authorizationStatusSchema: EnumSchema<AuthorizationStatus> =
  s.enumOf<AuthorizationStatus>(AuthorizationStatus);
