import Client from "@/EmeraldClient";
import RegistryModule from "./RegistryModule";

export default class Listener extends RegistryModule {
  public client: Client;
  constructor(client: Client) {
    super();
    this.client = client;

    this.getMethods().forEach((method) => {
      // @ts-ignore
      this[method] = this[method].bind(this);
    });
  }

  getMethods() {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter((method) => method.startsWith("on"));
  }

  load() {
    for (const method of this.getMethods()) {
      const eventName = this.uncapitalize(method);
      // @ts-ignore
      this.client.on(eventName, this[method]);
    }
  }

  unload() {
    for (const method of this.getMethods()) {
      const eventName = this.uncapitalize(method);
      // @ts-ignore
      this.client.removeListener(eventName, this[method]);
    }
  }

  uncapitalize(_str: string) {
    let str = _str.replace("on", "");
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
