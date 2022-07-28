import { Listener } from "@/structures";
import { Logger } from "@/utils";
import { Message } from "eris";

export default class ClientListener extends Listener {
  onReady() {
    Logger.info(`The super ${this.client.user.username} is ready to action!`);
  }
  onMessageCreate(message: Message) {
    console.log(`Receivedadsad: ${message.content}`);
  }
}
