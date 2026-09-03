import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const SetupFeeFailureAction = {
  Continue: "CONTINUE",
  Cancel: "CANCEL",
} as const;
export type SetupFeeFailureAction =
  | (typeof SetupFeeFailureAction)[keyof typeof SetupFeeFailureAction]
  | (string & {});

export const setupFeeFailureActionSchema: EnumSchema<SetupFeeFailureAction> =
  s.enumOf<SetupFeeFailureAction>(SetupFeeFailureAction);
