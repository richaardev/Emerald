import Manager from "@/managers";
import { ClientOptions, Client as ErisClient } from "eris";

export default class NanaClient extends ErisClient {
  public manager: Manager;

  constructor(token: string, options: ClientOptions = { intents: 46791 }) {
    super(token, options);

    this.manager = new Manager(this);
  }

  async start(): Promise<void> {
    await this.manager.load();
    await super.connect();
  }
}
