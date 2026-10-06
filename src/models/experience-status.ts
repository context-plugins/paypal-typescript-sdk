import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * This field indicates the status of PayPal's Checkout experience throughout the order lifecycle.
 * The values reflect the current stage of the checkout process.
 */
export const ExperienceStatus = {
  /** PayPal checkout process has not yet begun. */
  NotStarted: "NOT_STARTED",
  /** PayPal checkout initiated. User is on the checkout page for order review before approval. */
  InProgress: "IN_PROGRESS",
  /**
   * PayPal checkout is canceled (by closing the checkout window or clicking cancel) before the
   * order approval.
   */
  Canceled: "CANCELED",
  /** Order is approved. User has completed the checkout process. */
  Approved: "APPROVED",
} as const;
export type ExperienceStatus = (typeof ExperienceStatus)[keyof typeof ExperienceStatus] | (string & {});

export const experienceStatusSchema: EnumSchema<ExperienceStatus> =
  s.enumOf<ExperienceStatus>(ExperienceStatus);
