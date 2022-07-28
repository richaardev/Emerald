import { ClientOptions, Client as ErisClient } from "eris";
import ListenerRegistry from "./registry/ListenerRegistry";

export default class EmeraldClient extends ErisClient {
  public listenerRegistry: ListenerRegistry;

  constructor(token: string, options: ClientOptions = { intents: 46791 }) {
    super(token, options);

    this.listenerRegistry = new ListenerRegistry(this);
  }

  async start(): Promise<void> {
    await super.connect();
  }
}
