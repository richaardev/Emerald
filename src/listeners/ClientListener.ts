import { BaseListener } from "@/structures";
import { Logger } from "@/utils";

export default class ClientListener extends BaseListener {
  onReady() {
    Logger.info(`The super ${this.client.user.username} is ready to action!`);
  }
}
