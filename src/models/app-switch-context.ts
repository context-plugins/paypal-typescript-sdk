import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { mobileWebContextSchema, type MobileWebContext } from "./mobile-web-context.js";
import { nativeAppContextSchema, type NativeAppContext } from "./native-app-context.js";

/**
 * Merchant provided details of the native app or mobile web browser to facilitate buyer's app
 * switch to the PayPal consumer app.
 */
export type AppSwitchContext = {
  /** Merchant provided, buyer's native app preferences to app switch to the PayPal consumer app. */
  nativeApp?: NativeAppContext;
  /** Buyer's mobile web browser context to app switch to the PayPal consumer app. */
  mobileWeb?: MobileWebContext;
};

export const appSwitchContextSchema: Schema<AppSwitchContext> = s.object<AppSwitchContext>({
  nativeApp: s.optional(s.lazy(() => nativeAppContextSchema)),
  mobileWeb: s.optional(s.lazy(() => mobileWebContextSchema)),
  _keysMap: {
    nativeApp: "native_app",
    mobileWeb: "mobile_web",
  },
});
