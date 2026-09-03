import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { mobileReturnFlowSchema, type MobileReturnFlow } from "./mobile-return-flow.js";

export type MobileWebContext = {
  returnFlow?: MobileReturnFlow;
  buyerUserAgent?: string;
};

export const mobileWebContextSchema: Schema<MobileWebContext> = s.object<MobileWebContext>({
  returnFlow: s.optional(s.lazy(() => mobileReturnFlowSchema)),
  buyerUserAgent: s.optional(s.string()),
  _keysMap: {
    returnFlow: "return_flow",
    buyerUserAgent: "buyer_user_agent",
  },
});
