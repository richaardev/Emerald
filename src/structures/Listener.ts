import { RegistryModule } from "@/registry";
import RubyClient from "@/RubyClient";

export default class Listener extends RegistryModule {
  constructor(public client: RubyClient<true>) {
    super();

    this.getMethods().forEach((method) => {
      // @ts-ignore
      this[method] = this[method].bind(this);
    });
  }

  getMethods() {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter((method) =>
      method.startsWith("on"),
    );
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
