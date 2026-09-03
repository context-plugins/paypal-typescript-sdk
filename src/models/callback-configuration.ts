import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { callbackEventsSchema, type CallbackEvents } from "./callback-events.js";

export type CallbackConfiguration = {
  callbackEvents: CallbackEvents[];
  callbackUrl: string;
};

export const callbackConfigurationSchema: Schema<CallbackConfiguration> = s.object<CallbackConfiguration>({
  callbackEvents: s.array(s.lazy(() => callbackEventsSchema)),
  callbackUrl: s.string(),
  _keysMap: {
    callbackEvents: "callback_events",
    callbackUrl: "callback_url",
  },
});
