# Reference

> Source: [PaypalClient](src/client.ts)

## Orders

> Source: [Orders](src/resources/orders.ts)

<details>
<summary><code>authorizeOrder(request: Orders.AuthorizeOrderRequest, options?: RequestOptions): ApiPromise&lt;OrderAuthorizeResponse, Orders.AuthorizeOrderError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Authorizes payment for an order. To successfully authorize payment for an order, the buyer must first approve the order or a valid payment_source must be provided in the request. A buyer can approve the order upon being redirected to the rel:approve URL that was returned in the HATEOAS links in the create order response. Note: For error handling and troubleshooting, see Orders v2 errors.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.orders.authorizeOrder({ id });
  // TODO: Handle 'response' of type OrderAuthorizeResponse
} catch (err) {
  if (err instanceof Orders.AuthorizeOrderError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the order for which to authorize. |
| <code>payPalMockResponse?</code> | <code>string</code> | PayPal's REST API uses a request header to invoke negative testing in the sandbox. This header configures the sandbox into a negative testing state for transactions that include the merchant. |
| <code>payPalRequestId?</code> | <code>string</code> | The server stores keys for 6 hours. The API callers can request the times to up to 72 hours by speaking to their Account Manager. It is mandatory for all single-step create order calls (E.g. Create Order Request with payment source information like Card, PayPal.vault_id, PayPal.billing_agreement_id, etc). |
| <code>prefer?</code> | <code>string</code> | The preferred server response upon successful completion of the request. Value is: return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links. return=representation. The server returns a complete resource representation, including the current state of the resource. |
| <code>payPalClientMetadataId?</code> | <code>string</code> | - |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see PayPal-Auth-Assertion. |
| <code>body?</code> | <code>[OrderAuthorizeRequest](src/models/order-authorize-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[OrderAuthorizeResponse](src/models/order-authorize-response.ts)</code>

**OnError**: <code>[Orders.AuthorizeOrderError](src/resources/orders.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>captureOrder(request: Orders.CaptureOrderRequest, options?: RequestOptions): ApiPromise&lt;Order, Orders.CaptureOrderError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Captures payment for an order. To successfully capture payment for an order, the buyer must first approve the order or a valid payment_source must be provided in the request. A buyer can approve the order upon being redirected to the rel:approve URL that was returned in the HATEOAS links in the create order response. Note: For error handling and troubleshooting, see Orders v2 errors.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.orders.captureOrder({ id });
  // TODO: Handle 'response' of type Order
} catch (err) {
  if (err instanceof Orders.CaptureOrderError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the order for which to capture a payment. |
| <code>payPalMockResponse?</code> | <code>string</code> | PayPal's REST API uses a request header to invoke negative testing in the sandbox. This header configures the sandbox into a negative testing state for transactions that include the merchant. |
| <code>payPalRequestId?</code> | <code>string</code> | The server stores keys for 6 hours. The API callers can request the times to up to 72 hours by speaking to their Account Manager. It is mandatory for all single-step create order calls (E.g. Create Order Request with payment source information like Card, PayPal.vault_id, PayPal.billing_agreement_id, etc). |
| <code>prefer?</code> | <code>string</code> | The preferred server response upon successful completion of the request. Value is: return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links. return=representation. The server returns a complete resource representation, including the current state of the resource. |
| <code>payPalClientMetadataId?</code> | <code>string</code> | - |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see PayPal-Auth-Assertion. |
| <code>body?</code> | <code>[OrderCaptureRequest](src/models/order-capture-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[Order](src/models/order.ts)</code>

**OnError**: <code>[Orders.CaptureOrderError](src/resources/orders.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>confirmOrder(request: Orders.ConfirmOrderRequestParams, options?: RequestOptions): ApiPromise&lt;Order, Orders.ConfirmOrderError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Payer confirms their intent to pay for the the Order with the given payment source.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.orders.confirmOrder({ id });
  // TODO: Handle 'response' of type Order
} catch (err) {
  if (err instanceof Orders.ConfirmOrderError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the order for which the payer confirms their intent to pay. |
| <code>payPalClientMetadataId?</code> | <code>string</code> | - |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see PayPal-Auth-Assertion. |
| <code>prefer?</code> | <code>string</code> | The preferred server response upon successful completion of the request. Value is: return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links. return=representation. The server returns a complete resource representation, including the current state of the resource. |
| <code>body?</code> | <code>[ConfirmOrderRequest](src/models/confirm-order-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[Order](src/models/order.ts)</code>

**OnError**: <code>[Orders.ConfirmOrderError](src/resources/orders.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>createOrder(request: Orders.CreateOrderRequest, options?: RequestOptions): ApiPromise&lt;Order, Orders.CreateOrderError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Creates an order. Merchants and partners can add Level 2 and 3 data to payments to reduce risk and payment processing costs. For more information about processing payments, see checkout or multiparty checkout. Note: For error handling and troubleshooting, see Orders v2 errors.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.orders.createOrder({ body });
  // TODO: Handle 'response' of type Order
} catch (err) {
  if (err instanceof Orders.CreateOrderError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>payPalMockResponse?</code> | <code>string</code> | PayPal's REST API uses a request header to invoke negative testing in the sandbox. This header configures the sandbox into a negative testing state for transactions that include the merchant. |
| <code>payPalRequestId?</code> | <code>string</code> | The server stores keys for 6 hours. The API callers can request the times to up to 72 hours by speaking to their Account Manager. It is mandatory for all single-step create order calls (E.g. Create Order Request with payment source information like Card, PayPal.vault_id, PayPal.billing_agreement_id, etc). |
| <code>payPalPartnerAttributionId?</code> | <code>string</code> | - |
| <code>payPalClientMetadataId?</code> | <code>string</code> | - |
| <code>prefer?</code> | <code>string</code> | The preferred server response upon successful completion of the request. Value is: return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links. return=representation. The server returns a complete resource representation, including the current state of the resource. |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see PayPal-Auth-Assertion. |
| <code>body</code> | <code>[OrderRequest](src/models/order-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[Order](src/models/order.ts)</code>

**OnError**: <code>[Orders.CreateOrderError](src/resources/orders.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>createOrderTracking(request: Orders.CreateOrderTrackingRequest, options?: RequestOptions): ApiPromise&lt;Order, Orders.CreateOrderTrackingError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Adds tracking information for an Order.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.orders.createOrderTracking({ id, body });
  // TODO: Handle 'response' of type Order
} catch (err) {
  if (err instanceof Orders.CreateOrderTrackingError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the order that the tracking information is associated with. |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see PayPal-Auth-Assertion. |
| <code>body</code> | <code>[OrderTrackerRequest](src/models/order-tracker-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[Order](src/models/order.ts)</code>

**OnError**: <code>[Orders.CreateOrderTrackingError](src/resources/orders.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getOrder(request: Orders.GetOrderRequest, options?: RequestOptions): ApiPromise&lt;Order, Orders.GetOrderError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Shows details for an order, by ID. Note: For error handling and troubleshooting, see Orders v2 errors.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.orders.getOrder({ id });
  // TODO: Handle 'response' of type Order
} catch (err) {
  if (err instanceof Orders.GetOrderError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the order for which to show details. |
| <code>fields?</code> | <code>string</code> | A comma-separated list of fields that should be returned for the order. Valid filter field is `payment_source`. |
| <code>payPalMockResponse?</code> | <code>string</code> | PayPal's REST API uses a request header to invoke negative testing in the sandbox. This header configures the sandbox into a negative testing state for transactions that include the merchant. |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see PayPal-Auth-Assertion. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[Order](src/models/order.ts)</code>

**OnError**: <code>[Orders.GetOrderError](src/resources/orders.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>patchOrder(request: Orders.PatchOrderRequest, options?: RequestOptions): ApiPromise&lt;undefined, Orders.PatchOrderError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Updates an order with a `CREATED` or `APPROVED` status. You cannot update an order with the `COMPLETED` status.<br/><br/>To make an update, you must provide a `reference_id`. If you omit this value with an order that contains only one purchase unit, PayPal sets the value to `default` which enables you to use the path: <code>\"/purchase_units/@reference_id=='default'/{attribute-or-object}\"</code>. Merchants and partners can add Level 2 and 3 data to payments to reduce risk and payment processing costs. For more information about processing payments, see <a href="https://developer.paypal.com/docs/checkout/advanced/processing/">checkout</a> or <a href="https://developer.paypal.com/docs/multiparty/checkout/advanced/processing/">multiparty checkout</a>.<blockquote><strong>Note:</strong> For error handling and troubleshooting, see <a href="https://developer.paypal.com/api/rest/reference/orders/v2/errors/#patch-order">Orders v2 errors</a>.</blockquote>Patchable attributes or objects:<br/><br/><table><thead><th>Attribute</th><th>Op</th><th>Notes</th></thead><tbody><tr><td><code>intent</code></td><td>replace</td><td></td></tr><tr><td><code>payer</code></td><td>replace, add</td><td>Using replace op for <code>payer</code> will replace the whole <code>payer</code> object with the value sent in request.</td></tr><tr><td><code>purchase_units</code></td><td>replace, add</td><td></td></tr><tr><td><code>purchase_units[].custom_id</code></td><td>replace, add, remove</td><td></td></tr><tr><td><code>purchase_units[].description</code></td><td>replace, add, remove</td><td></td></tr><tr><td><code>purchase_units[].payee.email</code></td><td>replace</td><td></td></tr><tr><td><code>purchase_units[].shipping.name</code></td><td>replace, add</td><td></td></tr><tr><td><code>purchase_units[].shipping.email_address</code></td><td>replace, add</td><td></td></tr><tr><td><code>purchase_units[].shipping.phone_number</code></td><td>replace, add</td><td></td></tr><tr><td><code>purchase_units[].shipping.options</code></td><td>replace, add</td><td></td></tr><tr><td><code>purchase_units[].shipping.address</code></td><td>replace, add</td><td></td></tr><tr><td><code>purchase_units[].shipping.type</code></td><td>replace, add</td><td></td></tr><tr><td><code>purchase_units[].soft_descriptor</code></td><td>replace, remove</td><td></td></tr><tr><td><code>purchase_units[].amount</code></td><td>replace</td><td></td></tr><tr><td><code>purchase_units[].items</code></td><td>replace, add, remove</td><td></td></tr><tr><td><code>purchase_units[].invoice_id</code></td><td>replace, add, remove</td><td></td></tr><tr><td><code>purchase_units[].payment_instruction</code></td><td>replace</td><td></td></tr><tr><td><code>purchase_units[].payment_instruction.disbursement_mode</code></td><td>replace</td><td>By default, <code>disbursement_mode</code> is <code>INSTANT</code>.</td></tr><tr><td><code>purchase_units[].payment_instruction.payee_receivable_fx_rate_id</code></td><td>replace, add, remove</td><td></td></tr><tr><td><code>purchase_units[].payment_instruction.platform_fees</code></td><td>replace, add, remove</td><td></td></tr><tr><td><code>purchase_units[].supplementary_data.airline</code></td><td>replace, add, remove</td><td></td></tr><tr><td><code>purchase_units[].supplementary_data.card</code></td><td>replace, add, remove</td><td></td></tr><tr><td><code>application_context.client_configuration</code></td><td>replace, add</td><td></td></tr></tbody></table>

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  await client.orders.patchOrder({ id });
} catch (err) {
  if (err instanceof Orders.PatchOrderError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the order to update. |
| <code>payPalMockResponse?</code> | <code>string</code> | PayPal's REST API uses a request header to invoke negative testing in the sandbox. This header configures the sandbox into a negative testing state for transactions that include the merchant. |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see PayPal-Auth-Assertion. |
| <code>body?</code> | <code>[Patch](src/models/patch.ts)[]</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>undefined</code>

**OnError**: <code>[Orders.PatchOrderError](src/resources/orders.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateOrderTracking(request: Orders.UpdateOrderTrackingRequest, options?: RequestOptions): ApiPromise&lt;undefined, Orders.UpdateOrderTrackingError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Updates or cancels the tracking information for a PayPal order, by ID. Updatable attributes or objects: Attribute Op Notes items replace Using replace op for items will replace the entire items object with the value sent in request. notify_payer replace, add status replace Only patching status to CANCELLED is currently supported.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  await client.orders.updateOrderTracking({ id, trackerId });
} catch (err) {
  if (err instanceof Orders.UpdateOrderTrackingError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the order that the tracking information is associated with. |
| <code>trackerId</code> | <code>string</code> | The order tracking ID. |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see PayPal-Auth-Assertion. |
| <code>body?</code> | <code>[Patch](src/models/patch.ts)[]</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>undefined</code>

**OnError**: <code>[Orders.UpdateOrderTrackingError](src/resources/orders.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

## Payments

> Source: [Payments](src/resources/payments.ts)

<details>
<summary><code>captureAuthorizedPayment(request: Payments.CaptureAuthorizedPaymentRequest, options?: RequestOptions): ApiPromise&lt;CapturedPayment, Payments.CaptureAuthorizedPaymentError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Captures an authorized payment, by ID.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.payments.captureAuthorizedPayment({ authorizationId });
  // TODO: Handle 'response' of type CapturedPayment
} catch (err) {
  if (err instanceof Payments.CaptureAuthorizedPaymentError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>authorizationId</code> | <code>string</code> | The PayPal-generated ID for the authorized payment to capture. |
| <code>payPalMockResponse?</code> | <code>string</code> | PayPal's REST API uses a request header to invoke negative testing in the sandbox. This header configures the sandbox into a negative testing state for transactions that include the merchant. |
| <code>payPalRequestId?</code> | <code>string</code> | The server stores keys for 45 days. |
| <code>prefer?</code> | <code>string</code> | The preferred server response upon successful completion of the request. Value is: return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links. return=representation. The server returns a complete resource representation, including the current state of the resource. |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For three party transactions in which a partner is managing the API calls on behalf of a merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header or an access token with target_subject. |
| <code>body?</code> | <code>[CaptureRequest](src/models/capture-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[CapturedPayment](src/models/captured-payment.ts)</code>

**OnError**: <code>[Payments.CaptureAuthorizedPaymentError](src/resources/payments.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getAuthorizedPayment(request: Payments.GetAuthorizedPaymentRequest, options?: RequestOptions): ApiPromise&lt;PaymentAuthorization, Payments.GetAuthorizedPaymentError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Shows details for an authorized payment, by ID.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.payments.getAuthorizedPayment({ authorizationId });
  // TODO: Handle 'response' of type PaymentAuthorization
} catch (err) {
  if (err instanceof Payments.GetAuthorizedPaymentError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>authorizationId</code> | <code>string</code> | The ID of the authorized payment for which to show details. |
| <code>payPalMockResponse?</code> | <code>string</code> | PayPal's REST API uses a request header to invoke negative testing in the sandbox. This header configures the sandbox into a negative testing state for transactions that include the merchant. |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For three party transactions in which a partner is managing the API calls on behalf of a merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header or an access token with target_subject. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[PaymentAuthorization](src/models/payment-authorization.ts)</code>

**OnError**: <code>[Payments.GetAuthorizedPaymentError](src/resources/payments.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getCapturedPayment(request: Payments.GetCapturedPaymentRequest, options?: RequestOptions): ApiPromise&lt;CapturedPayment, Payments.GetCapturedPaymentError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Shows details for a captured payment, by ID.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.payments.getCapturedPayment({ captureId });
  // TODO: Handle 'response' of type CapturedPayment
} catch (err) {
  if (err instanceof Payments.GetCapturedPaymentError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>captureId</code> | <code>string</code> | The PayPal-generated ID for the captured payment for which to show details. |
| <code>payPalMockResponse?</code> | <code>string</code> | PayPal's REST API uses a request header to invoke negative testing in the sandbox. This header configures the sandbox into a negative testing state for transactions that include the merchant. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[CapturedPayment](src/models/captured-payment.ts)</code>

**OnError**: <code>[Payments.GetCapturedPaymentError](src/resources/payments.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getRefund(request: Payments.GetRefundRequest, options?: RequestOptions): ApiPromise&lt;Refund, Payments.GetRefundError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Shows details for a refund, by ID.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.payments.getRefund({ refundId });
  // TODO: Handle 'response' of type Refund
} catch (err) {
  if (err instanceof Payments.GetRefundError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>refundId</code> | <code>string</code> | The PayPal-generated ID for the refund for which to show details. |
| <code>payPalMockResponse?</code> | <code>string</code> | PayPal's REST API uses a request header to invoke negative testing in the sandbox. This header configures the sandbox into a negative testing state for transactions that include the merchant. |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For three party transactions in which a partner is managing the API calls on behalf of a merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header or an access token with target_subject. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[Refund](src/models/refund.ts)</code>

**OnError**: <code>[Payments.GetRefundError](src/resources/payments.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>reauthorizePayment(request: Payments.ReauthorizePaymentRequest, options?: RequestOptions): ApiPromise&lt;PaymentAuthorization, Payments.ReauthorizePaymentError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Reauthorizes an authorized PayPal account payment, by ID. To ensure that funds are still available, reauthorize a payment after its initial three-day honor period expires. Within the 29-day authorization period, you can issue multiple re-authorizations after the honor period expires. If 30 days have transpired since the date of the original authorization, you must create an authorized payment instead of reauthorizing the original authorized payment. A reauthorized payment itself has a new honor period of three days. You can reauthorize an authorized payment from 4 to 29 days after the 3-day honor period. The allowed amount depends on context and geography, for example in US it is up to 115% of the original authorized amount, not to exceed an increase of $75 USD. Supports only the `amount` request parameter.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.payments.reauthorizePayment({ authorizationId });
  // TODO: Handle 'response' of type PaymentAuthorization
} catch (err) {
  if (err instanceof Payments.ReauthorizePaymentError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>authorizationId</code> | <code>string</code> | The PayPal-generated ID for the authorized payment to reauthorize. |
| <code>payPalRequestId?</code> | <code>string</code> | The server stores keys for 45 days. |
| <code>prefer?</code> | <code>string</code> | The preferred server response upon successful completion of the request. Value is: return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links. return=representation. The server returns a complete resource representation, including the current state of the resource. |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For three party transactions in which a partner is managing the API calls on behalf of a merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header or an access token with target_subject. |
| <code>body?</code> | <code>[ReauthorizeRequest](src/models/reauthorize-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[PaymentAuthorization](src/models/payment-authorization.ts)</code>

**OnError**: <code>[Payments.ReauthorizePaymentError](src/resources/payments.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>refundCapturedPayment(request: Payments.RefundCapturedPaymentRequest, options?: RequestOptions): ApiPromise&lt;Refund, Payments.RefundCapturedPaymentError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Refunds a captured payment, by ID. For a full refund, include an empty payload in the JSON request body. For a partial refund, include an amount object in the JSON request body.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.payments.refundCapturedPayment({ captureId });
  // TODO: Handle 'response' of type Refund
} catch (err) {
  if (err instanceof Payments.RefundCapturedPaymentError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>captureId</code> | <code>string</code> | The PayPal-generated ID for the captured payment to refund. |
| <code>payPalMockResponse?</code> | <code>string</code> | PayPal's REST API uses a request header to invoke negative testing in the sandbox. This header configures the sandbox into a negative testing state for transactions that include the merchant. |
| <code>payPalRequestId?</code> | <code>string</code> | The server stores keys for 45 days. |
| <code>prefer?</code> | <code>string</code> | The preferred server response upon successful completion of the request. Value is: return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links. return=representation. The server returns a complete resource representation, including the current state of the resource. |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For three party transactions in which a partner is managing the API calls on behalf of a merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header or an access token with target_subject. |
| <code>body?</code> | <code>[RefundRequest](src/models/refund-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[Refund](src/models/refund.ts)</code>

**OnError**: <code>[Payments.RefundCapturedPaymentError](src/resources/payments.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>voidPayment(request: Payments.VoidPaymentRequest, options?: RequestOptions): ApiPromise&lt;PaymentAuthorization, Payments.VoidPaymentError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Voids, or cancels, an authorized payment, by ID. You cannot void an authorized payment that has been fully captured.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.payments.voidPayment({ authorizationId });
  // TODO: Handle 'response' of type PaymentAuthorization
} catch (err) {
  if (err instanceof Payments.VoidPaymentError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>authorizationId</code> | <code>string</code> | The PayPal-generated ID for the authorized payment to void. |
| <code>payPalMockResponse?</code> | <code>string</code> | PayPal's REST API uses a request header to invoke negative testing in the sandbox. This header configures the sandbox into a negative testing state for transactions that include the merchant. |
| <code>payPalAuthAssertion?</code> | <code>string</code> | An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For details, see [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For three party transactions in which a partner is managing the API calls on behalf of a merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header or an access token with target_subject. |
| <code>payPalRequestId?</code> | <code>string</code> | The server stores keys for 45 days. |
| <code>prefer?</code> | <code>string</code> | The preferred server response upon successful completion of the request. Value is: return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links. return=representation. The server returns a complete resource representation, including the current state of the resource. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[PaymentAuthorization](src/models/payment-authorization.ts)</code>

**OnError**: <code>[Payments.VoidPaymentError](src/resources/payments.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

## Vault

> Source: [Vault](src/resources/vault.ts)

<details>
<summary><code>createPaymentToken(request: Vault.CreatePaymentTokenRequest, options?: RequestOptions): ApiPromise&lt;PaymentTokenResponse, Vault.CreatePaymentTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Creates a Payment Token from the given payment source and adds it to the Vault of the associated customer.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.vault.createPaymentToken({ body });
  // TODO: Handle 'response' of type PaymentTokenResponse
} catch (err) {
  if (err instanceof Vault.CreatePaymentTokenError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>payPalRequestId?</code> | <code>string</code> | The server stores keys for 3 hours. |
| <code>body</code> | <code>[PaymentTokenRequest](src/models/payment-token-request.ts)</code> | Payment Token creation with a financial instrument and an optional customer_id. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[PaymentTokenResponse](src/models/payment-token-response.ts)</code>

**OnError**: <code>[Vault.CreatePaymentTokenError](src/resources/vault.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>createSetupToken(request: Vault.CreateSetupTokenRequest, options?: RequestOptions): ApiPromise&lt;SetupTokenResponse, Vault.CreateSetupTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Creates a Setup Token from the given payment source and adds it to the Vault of the associated customer.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.vault.createSetupToken({ body });
  // TODO: Handle 'response' of type SetupTokenResponse
} catch (err) {
  if (err instanceof Vault.CreateSetupTokenError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>payPalRequestId?</code> | <code>string</code> | The server stores keys for 3 hours. |
| <code>body</code> | <code>[SetupTokenRequest](src/models/setup-token-request.ts)</code> | Setup Token creation with a instrument type optional financial instrument details and customer_id. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[SetupTokenResponse](src/models/setup-token-response.ts)</code>

**OnError**: <code>[Vault.CreateSetupTokenError](src/resources/vault.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>deletePaymentToken(request: Vault.DeletePaymentTokenRequest, options?: RequestOptions): ApiPromise&lt;undefined, Vault.DeletePaymentTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Delete the payment token associated with the payment token id.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  await client.vault.deletePaymentToken({ id });
} catch (err) {
  if (err instanceof Vault.DeletePaymentTokenError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | ID of the payment token. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>undefined</code>

**OnError**: <code>[Vault.DeletePaymentTokenError](src/resources/vault.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getPaymentToken(request: Vault.GetPaymentTokenRequest, options?: RequestOptions): ApiPromise&lt;PaymentTokenResponse, Vault.GetPaymentTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Returns a readable representation of vaulted payment source associated with the payment token id.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.vault.getPaymentToken({ id });
  // TODO: Handle 'response' of type PaymentTokenResponse
} catch (err) {
  if (err instanceof Vault.GetPaymentTokenError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | ID of the payment token. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[PaymentTokenResponse](src/models/payment-token-response.ts)</code>

**OnError**: <code>[Vault.GetPaymentTokenError](src/resources/vault.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getSetupToken(request: Vault.GetSetupTokenRequest, options?: RequestOptions): ApiPromise&lt;SetupTokenResponse, Vault.GetSetupTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Returns a readable representation of temporarily vaulted payment source associated with the setup token id.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.vault.getSetupToken({ id });
  // TODO: Handle 'response' of type SetupTokenResponse
} catch (err) {
  if (err instanceof Vault.GetSetupTokenError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | ID of the setup token. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[SetupTokenResponse](src/models/setup-token-response.ts)</code>

**OnError**: <code>[Vault.GetSetupTokenError](src/resources/vault.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listCustomerPaymentTokens(request: Vault.ListCustomerPaymentTokensRequest, options?: RequestOptions): ApiPromise&lt;CustomerVaultPaymentTokensResponse, Vault.ListCustomerPaymentTokensError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Returns all payment tokens for a customer.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.vault.listCustomerPaymentTokens({ customerId });
  // TODO: Handle 'response' of type CustomerVaultPaymentTokensResponse
} catch (err) {
  if (err instanceof Vault.ListCustomerPaymentTokensError && err.payload.kind === "error") {
    // TODO: Handle 'err.payload.body' of type Error
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>customerId</code> | <code>string</code> | A unique identifier representing a specific customer in merchant's/partner's system or records. |
| <code>pageSize?</code> | <code>number</code> | A non-negative, non-zero integer indicating the maximum number of results to return at one time. |
| <code>page?</code> | <code>number</code> | A non-negative, non-zero integer representing the page of the results. |
| <code>totalRequired?</code> | <code>boolean</code> | A boolean indicating total number of items (total_items) and pages (total_pages) are expected to be returned in the response. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[CustomerVaultPaymentTokensResponse](src/models/customer-vault-payment-tokens-response.ts)</code>

**OnError**: <code>[Vault.ListCustomerPaymentTokensError](src/resources/vault.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

## TransactionSearch

> Source: [TransactionSearch](src/resources/transaction-search.ts)

<details>
<summary><code>searchBalances(request: TransactionSearch.SearchBalancesRequest, options?: RequestOptions): ApiPromise&lt;BalancesResponse, TransactionSearch.SearchBalancesError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

List all balances. Specify date time to list balances for that time that appear in the response. Notes: It takes a maximum of three hours for balances to appear in the list balances call. This call lists balances upto the previous three years.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.transactionSearch.searchBalances();
  // TODO: Handle 'response' of type BalancesResponse
} catch (err) {
  if (err instanceof TransactionSearch.SearchBalancesError && err.payload.kind === "defaultError") {
    // TODO: Handle 'err.payload.body' of type DefaultError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>asOfTime?</code> | <code>string</code> | List balances in the response at the date time provided, will return the last refreshed balance in the system when not provided. |
| <code>currencyCode?</code> | <code>string</code> | Filters the transactions in the response by a [three-character ISO-4217 currency code](https://developer.paypal.com/api/rest/reference/currency-codes/) for the PayPal transaction currency. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[BalancesResponse](src/models/balances-response.ts)</code>

**OnError**: <code>[TransactionSearch.SearchBalancesError](src/resources/transaction-search.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>searchTransactions(request: TransactionSearch.SearchTransactionsRequest, options?: RequestOptions): ApiPromise&lt;SearchResponse, TransactionSearch.SearchTransactionsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Lists transactions. Specify one or more query parameters to filter the transaction that appear in the response. Notes: If you specify one or more optional query parameters, the ending_balance response field is empty. It takes a maximum of three hours for executed transactions to appear in the list transactions call. This call lists transaction for the previous three years.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.transactionSearch.searchTransactions({ startDate, endDate });
  // TODO: Handle 'response' of type SearchResponse
} catch (err) {
  if (err instanceof TransactionSearch.SearchTransactionsError && err.payload.kind === "searchError") {
    // TODO: Handle 'err.payload.body' of type SearchError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>startDate</code> | <code>string</code> | Filters the transactions in the response by a start date and time, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required. Fractional seconds are optional. |
| <code>endDate</code> | <code>string</code> | Filters the transactions in the response by an end date and time, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required. Fractional seconds are optional. The maximum supported range is 31 days. |
| <code>transactionId?</code> | <code>string</code> | Filters the transactions in the response by a PayPal transaction ID. A valid transaction ID is 17 characters long, except for an order ID, which is 19 characters long. Note: A transaction ID is not unique in the reporting system. The response can list two transactions with the same ID. One transaction can be balance affecting while the other is non-balance affecting. |
| <code>transactionType?</code> | <code>string</code> | Filters the transactions in the response by a PayPal transaction event code. See [Transaction event codes](/docs/integration/direct/transaction-search/transaction-event-codes/). |
| <code>transactionStatus?</code> | <code>string</code> | Filters the transactions in the response by a PayPal transaction status code. Value is: Status code Description D PayPal or merchant rules denied the transaction. P The transaction is pending. The transaction was created but waits for another payment process to complete, such as an ACH transaction, before the status changes to S. S The transaction successfully completed without a denial and after any pending statuses. V A successful transaction was reversed and funds were refunded to the original sender. |
| <code>transactionAmount?</code> | <code>string</code> | Filters the transactions in the response by a gross transaction amount range. Specify the range as ` TO `, where ` ` is the lower limit of the gross PayPal transaction amount and ` ` is the upper limit of the gross transaction amount. Specify the amounts in lower denominations. For example, to search for transactions from $5.00 to $10.05, specify `[500 TO 1005]`. Note:The values must be URL encoded. |
| <code>transactionCurrency?</code> | <code>string</code> | Filters the transactions in the response by a [three-character ISO-4217 currency code](https://developer.paypal.com/api/rest/reference/currency-codes/) for the PayPal transaction currency. |
| <code>paymentInstrumentType?</code> | <code>string</code> | Filters the transactions in the response by a payment instrument type. Value is either: CREDITCARD. Returns a direct credit card transaction with a corresponding value. DEBITCARD. Returns a debit card transaction with a corresponding value. If you omit this parameter, the API does not apply this filter. |
| <code>storeId?</code> | <code>string</code> | Filters the transactions in the response by a store ID. |
| <code>terminalId?</code> | <code>string</code> | Filters the transactions in the response by a terminal ID. |
| <code>fields?</code> | <code>string</code> | Indicates which fields appear in the response. Value is a single field or a comma-separated list of fields. The transaction_info value returns only the transaction details in the response. To include all fields in the response, specify fields=all. Valid fields are: transaction_info. The transaction information. Includes the ID of the PayPal account of the payee, the PayPal-generated transaction ID, the PayPal-generated base ID, the PayPal reference ID type, the transaction event code, the date and time when the transaction was initiated and was last updated, the transaction amounts including the PayPal fee, any discounts, insurance, the transaction status, and other information about the transaction. payer_info. The payer information. Includes the PayPal customer account ID and the payer's email address, primary phone number, name, country code, address, and whether the payer is verified or unverified. shipping_info. The shipping information. Includes the recipient's name, the shipping method for this order, the shipping address for this order, and the secondary address associated with this order. auction_info. The auction information. Includes the name of the auction site, the auction site URL, the ID of the customer who makes the purchase in the auction, and the date and time when the auction closes. cart_info. The cart information. Includes an array of item details, whether the item amount or the shipping amount already includes tax, and the ID of the invoice for PayPal-generated invoices. incentive_info. An array of incentive detail objects. Each object includes the incentive, such as a special offer or coupon, the incentive amount, and the incentive program code that identifies a merchant loyalty or incentive program. store_info. The store information. Includes the ID of the merchant store and the terminal ID for the checkout stand in the merchant store. |
| <code>balanceAffectingRecordsOnly?</code> | <code>string</code> | Indicates whether the response includes only balance-impacting transactions or all transactions. Value is either: Y. The default. The response includes only balance transactions. N. The response includes all transactions. |
| <code>pageSize?</code> | <code>number</code> | The number of items to return in the response. So, the combination of `page=1` and `page_size=20` returns the first 20 items. The combination of `page=2` and `page_size=20` returns the next 20 items. |
| <code>page?</code> | <code>number</code> | The zero-relative start index of the entire list of items that are returned in the response. So, the combination of `page=1` and `page_size=20` returns the first 20 items. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[SearchResponse](src/models/search-response.ts)</code>

**OnError**: <code>[TransactionSearch.SearchTransactionsError](src/resources/transaction-search.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

## Subscriptions

> Source: [Subscriptions](src/resources/subscriptions.ts)

<details>
<summary><code>activateBillingPlan(request: Subscriptions.ActivateBillingPlanRequest, options?: RequestOptions): ApiPromise&lt;undefined, Subscriptions.ActivateBillingPlanError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Activates a plan, by ID.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  await client.subscriptions.activateBillingPlan({ id });
} catch (err) {
  if (err instanceof Subscriptions.ActivateBillingPlanError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the plan. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>undefined</code>

**OnError**: <code>[Subscriptions.ActivateBillingPlanError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>activateSubscription(request: Subscriptions.ActivateSubscriptionRequestParams, options?: RequestOptions): ApiPromise&lt;undefined, Subscriptions.ActivateSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Activates the subscription.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  await client.subscriptions.activateSubscription({ id });
} catch (err) {
  if (err instanceof Subscriptions.ActivateSubscriptionError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the subscription. |
| <code>body?</code> | <code>[ActivateSubscriptionRequest](src/models/activate-subscription-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>undefined</code>

**OnError**: <code>[Subscriptions.ActivateSubscriptionError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>cancelSubscription(request: Subscriptions.CancelSubscriptionRequestParams, options?: RequestOptions): ApiPromise&lt;undefined, Subscriptions.CancelSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Cancels the subscription.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  await client.subscriptions.cancelSubscription({ id });
} catch (err) {
  if (err instanceof Subscriptions.CancelSubscriptionError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the subscription. |
| <code>body?</code> | <code>[CancelSubscriptionRequest](src/models/cancel-subscription-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>undefined</code>

**OnError**: <code>[Subscriptions.CancelSubscriptionError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>captureSubscription(request: Subscriptions.CaptureSubscriptionRequestParams, options?: RequestOptions): ApiPromise&lt;SubscriptionTransactionDetails, Subscriptions.CaptureSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Captures an authorized payment from the subscriber on the subscription.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.captureSubscription({ id });
  // TODO: Handle 'response' of type SubscriptionTransactionDetails
} catch (err) {
  if (err instanceof Subscriptions.CaptureSubscriptionError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the subscription. |
| <code>payPalRequestId?</code> | <code>string</code> | The server stores keys for 72 hours. |
| <code>body?</code> | <code>[CaptureSubscriptionRequest](src/models/capture-subscription-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[SubscriptionTransactionDetails](src/models/subscription-transaction-details.ts)</code>

**OnError**: <code>[Subscriptions.CaptureSubscriptionError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>createBillingPlan(request: Subscriptions.CreateBillingPlanRequest, options?: RequestOptions): ApiPromise&lt;BillingPlan, Subscriptions.CreateBillingPlanError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Creates a plan that defines pricing and billing cycle details for subscriptions.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.createBillingPlan();
  // TODO: Handle 'response' of type BillingPlan
} catch (err) {
  if (err instanceof Subscriptions.CreateBillingPlanError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>prefer?</code> | <code>string</code> | The preferred server response upon successful completion of the request. Value is: return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links. return=representation. The server returns a complete resource representation, including the current state of the resource. |
| <code>payPalRequestId?</code> | <code>string</code> | The server stores keys for 72 hours. |
| <code>body?</code> | <code>[PlanRequest](src/models/plan-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[BillingPlan](src/models/billing-plan.ts)</code>

**OnError**: <code>[Subscriptions.CreateBillingPlanError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>createSubscription(request: Subscriptions.CreateSubscriptionRequestParams, options?: RequestOptions): ApiPromise&lt;Subscription, Subscriptions.CreateSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Creates a subscription.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.createSubscription();
  // TODO: Handle 'response' of type Subscription
} catch (err) {
  if (err instanceof Subscriptions.CreateSubscriptionError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>prefer?</code> | <code>string</code> | The preferred server response upon successful completion of the request. Value is: return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links. return=representation. The server returns a complete resource representation, including the current state of the resource. |
| <code>payPalRequestId?</code> | <code>string</code> | The server stores keys for 72 hours. |
| <code>payPalClientMetadataId?</code> | <code>string</code> | The PayPal Client Metadata Id(CMID) is used to provide device-specific information to PayPal's risk engine. This is crucial for transactions that require device-specific risk assessments. Merchants typically use the Paypal SDK that automatically submits the CMID or they use tools like Fraudnet JS for web or Magnes JS for mobile to generate the CMID on the frontend and then pass it to the API as part of the request headers. |
| <code>body?</code> | <code>[CreateSubscriptionRequest](src/models/create-subscription-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[Subscription](src/models/subscription.ts)</code>

**OnError**: <code>[Subscriptions.CreateSubscriptionError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>deactivateBillingPlan(request: Subscriptions.DeactivateBillingPlanRequest, options?: RequestOptions): ApiPromise&lt;undefined, Subscriptions.DeactivateBillingPlanError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Deactivates a plan, by ID.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  await client.subscriptions.deactivateBillingPlan({ id });
} catch (err) {
  if (err instanceof Subscriptions.DeactivateBillingPlanError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the plan. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>undefined</code>

**OnError**: <code>[Subscriptions.DeactivateBillingPlanError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getBillingPlan(request: Subscriptions.GetBillingPlanRequest, options?: RequestOptions): ApiPromise&lt;BillingPlan, Subscriptions.GetBillingPlanError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Shows details for a plan, by ID.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.getBillingPlan({ id });
  // TODO: Handle 'response' of type BillingPlan
} catch (err) {
  if (err instanceof Subscriptions.GetBillingPlanError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the plan. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[BillingPlan](src/models/billing-plan.ts)</code>

**OnError**: <code>[Subscriptions.GetBillingPlanError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getSubscription(request: Subscriptions.GetSubscriptionRequest, options?: RequestOptions): ApiPromise&lt;Subscription, Subscriptions.GetSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Shows details for a subscription, by ID.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.getSubscription({ id });
  // TODO: Handle 'response' of type Subscription
} catch (err) {
  if (err instanceof Subscriptions.GetSubscriptionError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the subscription. |
| <code>fields?</code> | <code>string</code> | List of fields that are to be returned in the response. Possible value for fields are last_failed_payment and plan. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[Subscription](src/models/subscription.ts)</code>

**OnError**: <code>[Subscriptions.GetSubscriptionError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listBillingPlans(request: Subscriptions.ListBillingPlansRequest, options?: RequestOptions): ApiPromise&lt;PlanCollection, Subscriptions.ListBillingPlansError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Lists billing plans.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.listBillingPlans();
  // TODO: Handle 'response' of type PlanCollection
} catch (err) {
  if (err instanceof Subscriptions.ListBillingPlansError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>productId?</code> | <code>string</code> | Filters the response by a Product ID. |
| <code>pageSize?</code> | <code>number</code> | The number of items to return in the response. |
| <code>page?</code> | <code>number</code> | A non-zero integer which is the start index of the entire list of items to return in the response. The combination of `page=1` and `page_size=20` returns the first 20 items. The combination of `page=2` and `page_size=20` returns the next 20 items. |
| <code>totalRequired?</code> | <code>boolean</code> | Indicates whether to show the total count in the response. |
| <code>prefer?</code> | <code>string</code> | The preferred server response upon successful completion of the request. Value is: return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, name, description and HATEOAS links. return=representation. The server returns a complete resource representation, including the current state of the resource. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[PlanCollection](src/models/plan-collection.ts)</code>

**OnError**: <code>[Subscriptions.ListBillingPlansError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listSubscriptionTransactions(request: Subscriptions.ListSubscriptionTransactionsRequest, options?: RequestOptions): ApiPromise&lt;TransactionsList, Subscriptions.ListSubscriptionTransactionsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Lists transactions for a subscription.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.listSubscriptionTransactions({ id, startTime, endTime });
  // TODO: Handle 'response' of type TransactionsList
} catch (err) {
  if (
    err instanceof Subscriptions.ListSubscriptionTransactionsError && err.payload.kind === "subscriptionError"
  ) {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the subscription. |
| <code>startTime</code> | <code>string</code> | The start time of the range of transactions to list. |
| <code>endTime</code> | <code>string</code> | The end time of the range of transactions to list. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[TransactionsList](src/models/transactions-list.ts)</code>

**OnError**: <code>[Subscriptions.ListSubscriptionTransactionsError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listSubscriptions(request: Subscriptions.ListSubscriptionsRequest, options?: RequestOptions): ApiPromise&lt;SubscriptionCollection, Subscriptions.ListSubscriptionsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

List all subscriptions for merchant account.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.listSubscriptions();
  // TODO: Handle 'response' of type SubscriptionCollection
} catch (err) {
  if (err instanceof Subscriptions.ListSubscriptionsError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>planIds?</code> | <code>string</code> | Filters the response by list of plan IDs. Filter supports upto 70 plan IDs. URLs should not exceed a length of 2000 characters. |
| <code>statuses?</code> | <code>string</code> | Filters the response by list of subscription statuses. |
| <code>createdAfter?</code> | <code>string</code> | Filters the response by subscription creation start time for a range of subscriptions. |
| <code>createdBefore?</code> | <code>string</code> | Filters the response by subscription creation end time for a range of subscriptions. |
| <code>statusUpdatedBefore?</code> | <code>string</code> | Filters the response by status update start time for a range of subscriptions. |
| <code>statusUpdatedAfter?</code> | <code>string</code> | Filters the response by status update end time for a range of subscriptions. |
| <code>filter?</code> | <code>string</code> | Filter the response using complex expressions that could use comparison operators like ge, gt, le, lt and logical operators such as 'and' and 'or'. |
| <code>pageSize?</code> | <code>number</code> | The number of items to return in the response. |
| <code>page?</code> | <code>number</code> | A non-zero integer which is the start index of the entire list of items to return in the response. The combination of `page=1` and `page_size=20` returns the first 20 items. The combination of `page=2` and `page_size=20` returns the next 20 items. |
| <code>customerIds?</code> | <code>string[]</code> | Filters the response by comma separated vault customer IDs (FSS subscriptions only). |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[SubscriptionCollection](src/models/subscription-collection.ts)</code>

**OnError**: <code>[Subscriptions.ListSubscriptionsError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>patchBillingPlan(request: Subscriptions.PatchBillingPlanRequest, options?: RequestOptions): ApiPromise&lt;undefined, Subscriptions.PatchBillingPlanError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Updates a plan with the `CREATED` or `ACTIVE` status. For an `INACTIVE` plan, you can make only status updates. You can patch these attributes and objects: Attribute or object Operations description replace payment_preferences.auto_bill_outstanding replace taxes.percentage replace payment_preferences.payment_failure_threshold replace payment_preferences.setup_fee replace payment_preferences.setup_fee_failure_action replace name replace

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  await client.subscriptions.patchBillingPlan({ id });
} catch (err) {
  if (err instanceof Subscriptions.PatchBillingPlanError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the plan. |
| <code>body?</code> | <code>[Patch](src/models/patch.ts)[]</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>undefined</code>

**OnError**: <code>[Subscriptions.PatchBillingPlanError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>patchSubscription(request: Subscriptions.PatchSubscriptionRequest, options?: RequestOptions): ApiPromise&lt;undefined, Subscriptions.PatchSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Updates a subscription which could be in ACTIVE or SUSPENDED status. You can override plan level default attributes by providing customised values for plan path in the patch request. You cannot update attributes that have already completed (Example - trial cycles can’t be updated if completed). Once overridden, changes to plan resource will not impact subscription. Any price update will not impact billing cycles within next 10 days (Applicable only for subscriptions funded by PayPal account). Following are the fields eligible for patch. Attribute or object Operations billing_info.outstanding_balance replace custom_id add,replace plan.billing_cycles[@sequence==n]. pricing_scheme.fixed_price add,replace plan.billing_cycles[@sequence==n]. pricing_scheme.tiers replace plan.billing_cycles[@sequence==n]. total_cycles replace plan.payment_preferences. auto_bill_outstanding replace plan.payment_preferences. payment_failure_threshold replace plan.taxes.inclusive add,replace plan.taxes.percentage add,replace shipping_amount add,replace start_time replace subscriber.shipping_address add,replace subscriber.payment_source (for subscriptions funded by card payments) replace

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  await client.subscriptions.patchSubscription({ id });
} catch (err) {
  if (err instanceof Subscriptions.PatchSubscriptionError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID for the subscription. |
| <code>body?</code> | <code>[Patch](src/models/patch.ts)[]</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>undefined</code>

**OnError**: <code>[Subscriptions.PatchSubscriptionError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>reviseSubscription(request: Subscriptions.ReviseSubscriptionRequest, options?: RequestOptions): ApiPromise&lt;ModifySubscriptionResponse, Subscriptions.ReviseSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Updates the quantity of the product or service in a subscription. You can also use this method to switch the plan and update the `shipping_amount`, `shipping_address` values for the subscription. This type of update requires the buyer's consent.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.reviseSubscription({ id });
  // TODO: Handle 'response' of type ModifySubscriptionResponse
} catch (err) {
  if (err instanceof Subscriptions.ReviseSubscriptionError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the subscription. |
| <code>body?</code> | <code>[ModifySubscriptionRequest](src/models/modify-subscription-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[ModifySubscriptionResponse](src/models/modify-subscription-response.ts)</code>

**OnError**: <code>[Subscriptions.ReviseSubscriptionError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>suspendSubscription(request: Subscriptions.SuspendSubscriptionRequest, options?: RequestOptions): ApiPromise&lt;undefined, Subscriptions.SuspendSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Suspends the subscription.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  await client.subscriptions.suspendSubscription({ id });
} catch (err) {
  if (err instanceof Subscriptions.SuspendSubscriptionError && err.payload.kind === "subscriptionError") {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID of the subscription. |
| <code>body?</code> | <code>[SuspendSubscription](src/models/suspend-subscription.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>undefined</code>

**OnError**: <code>[Subscriptions.SuspendSubscriptionError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateBillingPlanPricingSchemes(request: Subscriptions.UpdateBillingPlanPricingSchemesRequest, options?: RequestOptions): ApiPromise&lt;undefined, Subscriptions.UpdateBillingPlanPricingSchemesError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Updates pricing for a plan. For example, you can update a regular billing cycle from $5 per month to $7 per month.

</dd>
</dl>

### Usage

<dl>
<dd>

```ts
try {
  await client.subscriptions.updateBillingPlanPricingSchemes({ id });
} catch (err) {
  if (
    err instanceof Subscriptions.UpdateBillingPlanPricingSchemesError &&
      err.payload.kind === "subscriptionError"
  ) {
    // TODO: Handle 'err.payload.body' of type SubscriptionError
  }
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | The ID for the plan. |
| <code>body?</code> | <code>[UpdatePricingSchemesRequest](src/models/update-pricing-schemes-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>undefined</code>

**OnError**: <code>[Subscriptions.UpdateBillingPlanPricingSchemesError](src/resources/subscriptions.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

