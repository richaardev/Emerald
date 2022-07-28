import { ClientOptions, Client } from "discord.js";
import ListenerRegistry from "./registry/ListenerRegistry";

export default class EmeraldClient<Ready extends boolean = boolean> extends Client<Ready> {
  public listenerRegistry: ListenerRegistry;
 
  constructor(private _token: string, options: ClientOptions = { intents: 46791 }) {
    super(options);

    this.listenerRegistry = new ListenerRegistry(this);
  }

  async start(): Promise<void> {
    await super.login(this._token);
  }
}
