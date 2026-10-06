import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The action to take on the subscription if the initial payment for the setup fails. */
export const SetupFeeFailureAction = {
  /** Continues the subscription if the initial payment for the setup fails. */
  Continue: "CONTINUE",
  /** Cancels the subscription if the initial payment for the setup fails. */
  Cancel: "CANCEL",
} as const;
export type SetupFeeFailureAction =
  | (typeof SetupFeeFailureAction)[keyof typeof SetupFeeFailureAction]
  | (string & {});

export const setupFeeFailureActionSchema: EnumSchema<SetupFeeFailureAction> =
  s.enumOf<SetupFeeFailureAction>(SetupFeeFailureAction);
