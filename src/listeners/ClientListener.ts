import { BaseListener } from "@/structures";
import { Logger } from "@/utils";
import NanaClient from "@/NanaClient";

export default class ClientListener extends BaseListener {
  constructor(client: NanaClient) {
    super(client);
  }

  onReady() {
    Logger.info(`The super ${this.client.user.username} is ready to action!`);
  }
  
}
