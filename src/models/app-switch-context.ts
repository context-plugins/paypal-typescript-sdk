import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { mobileWebContextSchema, type MobileWebContext } from "./mobile-web-context.js";
import { nativeAppContextSchema, type NativeAppContext } from "./native-app-context.js";

export type AppSwitchContext = {
  nativeApp?: NativeAppContext;
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
