import { Client as ErisClient, ClientOptions } from "eris";

export default class NanaClient extends ErisClient {
  constructor(token: string, options: ClientOptions = { intents: 46791 }) {
    super(token, options);
  }
}
