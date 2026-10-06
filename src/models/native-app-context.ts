import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { osTypeSchema, type OsType } from "./os-type.js";

/** Merchant provided, buyer's native app preferences to app switch to the PayPal consumer app. */
export type NativeAppContext = {
  /** Operating System type of the device that the buyer is using. */
  osType?: OsType;
  /** Operating System version of the device that the buyer is using. */
  osVersion?: string;
};

export const nativeAppContextSchema: Schema<NativeAppContext> = s.object<NativeAppContext>({
  osType: s.optional(s.lazy(() => osTypeSchema)),
  osVersion: s.optional(s.string()),
  _keysMap: {
    osType: "os_type",
    osVersion: "os_version",
  },
});
