import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const VaultUserAction = {
  SetupNow: "SETUP_NOW",
  Continue: "CONTINUE",
} as const;
export type VaultUserAction = (typeof VaultUserAction)[keyof typeof VaultUserAction] | (string & {});

export const vaultUserActionSchema: EnumSchema<VaultUserAction> = s.enumOf<VaultUserAction>(VaultUserAction);
