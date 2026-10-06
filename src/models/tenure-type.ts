import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * The tenure type of the billing cycle identifies if the billing cycle is a trial(free or
 * discounted) or regular billing cycle., The tenure type of the billing cycle. In case of a plan
 * having trial cycle, only 2 trial cycles are allowed per plan., The type of the billing cycle.
 */
export const TenureType = {
  /** A regular billing cycle to identify recurring charges for the billing agreement. */
  Regular: "REGULAR",
  /**
   * A trial billing cycle to identify free or discounted charge for the billing agreement. Free
   * trails will not have a price object in pricing scheme where as a discounted trial would have a
   * discounted price compared to regular billing cycle.
   */
  Trial: "TRIAL",
} as const;
export type TenureType = (typeof TenureType)[keyof typeof TenureType] | (string & {});

export const tenureTypeSchema: EnumSchema<TenureType> = s.enumOf<TenureType>(TenureType);
