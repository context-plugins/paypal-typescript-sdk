import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { osTypeSchema, type OsType } from "./os-type.js";

export type NativeAppContext = {
  osType?: OsType;
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
