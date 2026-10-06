import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The order status. */
export const OrderStatus = {
  /** The order was created with the specified context. */
  Created: "CREATED",
  /**
   * The order was saved and persisted. The order status continues to be in progress until a capture
   * is made with final_capture = true for all purchase units within the order.
   */
  Saved: "SAVED",
  /**
   * The customer approved the payment through the PayPal wallet or another form of guest or
   * unbranded payment. For example, a card, bank account, or so on.
   */
  Approved: "APPROVED",
  /** All purchase units in the order are voided. */
  Voided: "VOIDED",
  /**
   * The intent of the order was completed and a `payments` resource was created. Important: Check
   * the payment status in `purchase_units[].payments.captures[].status` before fulfilling the
   * order. A completed order can indicate a payment was authorized, an authorized payment was
   * captured, or a payment was declined.
   */
  Completed: "COMPLETED",
  /**
   * The order requires an action from the payer (e.g. 3DS authentication). Redirect the payer to
   * the "rel":"payer-action" HATEOAS link returned as part of the response prior to authorizing or
   * capturing the order. Some payment sources may not return a payer-action HATEOAS link (eg. MB
   * WAY). For these payment sources the payer-action is managed by the scheme itself (eg. through
   * SMS, email, in-app notification, etc).
   */
  PayerActionRequired: "PAYER_ACTION_REQUIRED",
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus] | (string & {});

export const orderStatusSchema: EnumSchema<OrderStatus> = s.enumOf<OrderStatus>(OrderStatus);
