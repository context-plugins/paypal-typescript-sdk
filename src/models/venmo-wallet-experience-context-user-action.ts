import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const VenmoWalletExperienceContextUserAction = {
  Continue: "CONTINUE",
  PayNow: "PAY_NOW",
} as const;
export type VenmoWalletExperienceContextUserAction =
  | (typeof VenmoWalletExperienceContextUserAction)[keyof typeof VenmoWalletExperienceContextUserAction]
  | (string & {});

export const venmoWalletExperienceContextUserActionSchema: EnumSchema<VenmoWalletExperienceContextUserAction> =
  s.enumOf<VenmoWalletExperienceContextUserAction>(VenmoWalletExperienceContextUserAction);
