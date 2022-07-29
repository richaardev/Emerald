import { ClientOptions, Client } from "discord.js";
import RegistryManager from "./managers/RegistryManager";

export default class EmeraldClient<Ready extends boolean = boolean> extends Client<Ready> {
  public registry: RegistryManager;
  constructor(private _token: string, options: ClientOptions = { intents: 46791 }) {
    super(options);

    this.registry = new RegistryManager(this);
  }

  async start(): Promise<void> {
    await super.login(this._token);
  }
}
