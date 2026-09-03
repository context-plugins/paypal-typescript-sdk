import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const StoreInVaultInstruction = {
  OnSuccess: "ON_SUCCESS",
} as const;
export type StoreInVaultInstruction =
  | (typeof StoreInVaultInstruction)[keyof typeof StoreInVaultInstruction]
  | (string & {});

export const storeInVaultInstructionSchema: EnumSchema<StoreInVaultInstruction> =
  s.enumOf<StoreInVaultInstruction>(StoreInVaultInstruction);
