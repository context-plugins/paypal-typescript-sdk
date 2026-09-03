import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const VaultCardVerificationMethod = {
  ScaWhenRequired: "SCA_WHEN_REQUIRED",
  ScaAlways: "SCA_ALWAYS",
} as const;
export type VaultCardVerificationMethod =
  | (typeof VaultCardVerificationMethod)[keyof typeof VaultCardVerificationMethod]
  | (string & {});

export const vaultCardVerificationMethodSchema: EnumSchema<VaultCardVerificationMethod> =
  s.enumOf<VaultCardVerificationMethod>(VaultCardVerificationMethod);
