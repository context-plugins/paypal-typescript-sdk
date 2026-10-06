import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { MobileReturnFlow, mobileReturnFlowSchema } from "./mobile-return-flow.js";

/** Buyer's mobile web browser context to app switch to the PayPal consumer app. */
export type MobileWebContext = {
  /**
   * Merchant preference on how the buyer can navigate back to merchant website post approving the
   * transaction on the PayPal App.
   *
   * @default MobileReturnFlow.Auto
   */
  returnFlow?: MobileReturnFlow;
  /**
   * User agent from the request originating from the buyer's device. This will be used to identify
   * the buyer's operating system and browser versions. NOTE: Merchants must not alter or modify the
   * buyer's device user agent.
   */
  buyerUserAgent?: string;
};

export const mobileWebContextSchema: Schema<MobileWebContext> = s.object<MobileWebContext>({
  returnFlow: s.defaulted(mobileReturnFlowSchema, MobileReturnFlow.Auto),
  buyerUserAgent: s.optional(s.string()),
  _keysMap: {
    returnFlow: "return_flow",
    buyerUserAgent: "buyer_user_agent",
  },
});
