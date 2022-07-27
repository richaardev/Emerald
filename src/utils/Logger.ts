import moment from "moment";

type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
  // TODO: Per level colors;

  static get #currentTime(): string {
    return `${moment(Date.now()).format("HH:mm:ss")}`;
  }

  protected static log(messages: any[], level: LogLevel = "info") {
    const message = messages.map((x) => String(x)).join(" ");
    const levelText = `[${level.toLocaleUpperCase()}]`;
    console[level](`[${this.#currentTime}] ${levelText}: ${message}`);
  }

  static info(...messages: any[]): void {
    this.log(messages, "info");
  }

  static warn(...messages: any[]): void {
    this.log(messages, "warn");
  }

  static debug(...messages: any[]): void {
    this.log(messages, "debug");
  }

  static error(...messages: any[]): void {
    this.log(messages, "error");
  }
}

export default Logger;
