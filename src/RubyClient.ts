import { ClientOptions, Client } from "discord.js";
import { Registries } from "./structures/Registries";
import config from "./RubyConfig";
import Managers from "./structures/Managers";

type ClientConfig = typeof config;

export default class RubyClient<Ready extends boolean = boolean> extends Client<Ready> {
  public config: ClientConfig;
  public managers: Managers;
  public registries: Registries;
  
  constructor(private _token: string, options: ClientOptions = { intents: 46791 }) {
    super(options);

    this.config = config;
    this.registries = new Registries(this);
    this.managers = new Managers(this);
  }

  async start(): Promise<void> {
    await super.login(this._token);
  }
}
