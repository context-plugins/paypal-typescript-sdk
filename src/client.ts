import { buildAuthSchemes, type AuthSchemes } from "./auth-schemes.js";
import { DEFAULT_CLIENT_OPTIONS, type ClientOptions } from "./client-options.js";
import { RawClient } from "./core/raw-client.js";
import { Orders } from "./resources/orders.js";
import { Payments } from "./resources/payments.js";
import { Subscriptions } from "./resources/subscriptions.js";
import { TransactionSearch } from "./resources/transaction-search.js";
import { Vault } from "./resources/vault.js";
import { buildServers, type Servers } from "./servers.js";

export class PaypalClient {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;
  #orders?: Orders;
  #payments?: Payments;
  #vault?: Vault;
  #transactionSearch?: TransactionSearch;
  #subscriptions?: Subscriptions;

  constructor(clientOptions: Partial<ClientOptions> = {}) {
    const options = { ...DEFAULT_CLIENT_OPTIONS, ...clientOptions };

    this.#rawClient = new RawClient({
      timeout: options.timeout,
      defaultHeaders: [],
      defaultQuery: [],
      defaultPathParams: [],
      fetch: options.fetch,
    });

    this.#servers = buildServers(options.serverEnvironment, options.serverOptions);

    this.#auth = buildAuthSchemes(options, this.#servers, this.#rawClient);
  }

  get orders(): Orders {
    return (this.#orders ??= new Orders(this.#rawClient, this.#servers, this.#auth));
  }

  get payments(): Payments {
    return (this.#payments ??= new Payments(this.#rawClient, this.#servers, this.#auth));
  }

  get vault(): Vault {
    return (this.#vault ??= new Vault(this.#rawClient, this.#servers, this.#auth));
  }

  get transactionSearch(): TransactionSearch {
    return (this.#transactionSearch ??= new TransactionSearch(this.#rawClient, this.#servers, this.#auth));
  }

  get subscriptions(): Subscriptions {
    return (this.#subscriptions ??= new Subscriptions(this.#rawClient, this.#servers, this.#auth));
  }
}
