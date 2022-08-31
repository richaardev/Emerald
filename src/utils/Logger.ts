import moment from "moment";

type LogLevel = "info" | "warn" | "error" | "debug";

const levelColors: Record<LogLevel, string> = {
  warn: "33",
  info: "34",
  debug: "35",
  error: "31",
};

class Logger {
  static get #currentTime(): string {
    return `${moment(Date.now()).format("YYYY:MM:DD HH:mm:ss")}`;
  }

  protected static log(messages: any[], level: LogLevel = "info") {
    const message = messages.map((x) => String(x)).join(" ");
    const levelText = `${level.toLocaleUpperCase()}`;
    const levelColor = `\u001b[${levelColors[level]};1m`;

    console[level](
      `\u001b[38;5;239m${
        this.#currentTime
      } ${levelColor}${levelText}\u001b[0m \u001b[37m${message}`,
    );
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
