import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const VenmoVaultResponseStatus = {
  Vaulted: "VAULTED",
  Created: "CREATED",
  Approved: "APPROVED",
} as const;
export type VenmoVaultResponseStatus =
  | (typeof VenmoVaultResponseStatus)[keyof typeof VenmoVaultResponseStatus]
  | (string & {});

export const venmoVaultResponseStatusSchema: EnumSchema<VenmoVaultResponseStatus> =
  s.enumOf<VenmoVaultResponseStatus>(VenmoVaultResponseStatus);
