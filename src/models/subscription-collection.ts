import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { subscriptionSchema, type Subscription } from "./subscription.js";

export type SubscriptionCollection = {
  subscriptions?: Subscription[];
  links?: LinkDescription[];
};

export const subscriptionCollectionSchema: Schema<SubscriptionCollection> = s.object<SubscriptionCollection>({
  subscriptions: s.optional(s.array(s.lazy(() => subscriptionSchema))),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
});
