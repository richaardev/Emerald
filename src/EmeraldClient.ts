import { ClientOptions, Client } from "discord.js";
import CommandRegistry from "./registry/CommandRegistry";
import ListenerRegistry from "./registry/ListenerRegistry";

export default class EmeraldClient<Ready extends boolean = boolean> extends Client<Ready> {
  public listenerRegistry: ListenerRegistry;
  public commandRegistry: CommandRegistry;

  constructor(private _token: string, options: ClientOptions = { intents: 46791 }) {
    super(options);

    this.commandRegistry = new CommandRegistry(this);
    this.listenerRegistry = new ListenerRegistry(this);
  }

  async start(): Promise<void> {
    await super.login(this._token);
  }
}
