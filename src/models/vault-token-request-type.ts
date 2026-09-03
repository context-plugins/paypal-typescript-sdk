import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const VaultTokenRequestType = {
  SetupToken: "SETUP_TOKEN",
} as const;
export type VaultTokenRequestType =
  | (typeof VaultTokenRequestType)[keyof typeof VaultTokenRequestType]
  | (string & {});

export const vaultTokenRequestTypeSchema: EnumSchema<VaultTokenRequestType> =
  s.enumOf<VaultTokenRequestType>(VaultTokenRequestType);
