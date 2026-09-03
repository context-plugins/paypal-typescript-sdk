import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const ApplicationContextUserAction = {
  Continue: "CONTINUE",
  SubscribeNow: "SUBSCRIBE_NOW",
} as const;
export type ApplicationContextUserAction =
  | (typeof ApplicationContextUserAction)[keyof typeof ApplicationContextUserAction]
  | (string & {});

export const applicationContextUserActionSchema: EnumSchema<ApplicationContextUserAction> =
  s.enumOf<ApplicationContextUserAction>(ApplicationContextUserAction);
