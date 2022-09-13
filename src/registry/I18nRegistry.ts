/* eslint-disable @typescript-eslint/indent */
import RubyClient from "@/RubyClient";
import { Logger } from "@/utils";
import { basename, dirname, join } from "path";
import { fileURLToPath } from "url";
import { Registry, RegistryModule } from "./";

import commandsJson from "@/locales/en-US/commands.json";

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;
type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

export type CommandsNamespace = `commands:${DotNestedKeys<typeof commandsJson>}`;
export type TranslationKey = CommandsNamespace;
export type FixedT = (translation: TranslationKey, placeholders?: object) => string;

class LanguageModule extends RegistryModule {
  private translations: object;

  constructor(public language: string) {
    super();

    this.translations = {};
  }

  loadNamespace(namespace: string, data: object) {
    this.translations = { ...this.translations, [namespace]: data };
  }

  getTranslation(namespace: string, path: string, placeholders?: object): string {
    let translation = path
      .split(".")
      // @ts-expect-error
      .reduce((obj, curr) => obj?.[curr], this.translations[namespace]);

    if (placeholders)
      Object.keys(placeholders).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`);
        // @ts-expect-error
        translation = translation.replace(regex, placeholders[key]);
      });

    return (translation as string) || path;
  }
}

export default class I18nRegistry extends Registry {
  public override modules: LanguageModule[];

  constructor(client: RubyClient) {
    super(client, {
      path: join(fileURLToPath(import.meta.url), "../../", "locales"),
      autoReload: process.env.PRODUCTION == undefined,
    });

    this.modules = [];

    this.loadAll(this.path);
  }

  registerLanguage(language: string) {
    const existing = this.modules.find((m) => m.language === language);
    if (existing) return existing;

    const newLang = new LanguageModule(language);
    this.modules.push(newLang);
    return newLang;
  }

  getFixedT(language: string): FixedT {
    const lang = this.modules.find((m) => m.language === language);

    return function fixedT(translation: string, placeholders?: object) {
      const namespace = translation.split(":")[0];
      const path = translation.split(":").slice(1).join("");

      return lang?.getTranslation(namespace, path, placeholders) || path;
    };
  }

  override async load(path: string): Promise<boolean> {
    try {
      const data = (
        await import(path, {
          assert: { type: "json" },
        })
      ).default;
      const namespace = basename(path);
      const language = basename(dirname(path));
      const module = this.registerLanguage(language);
      module.loadNamespace(namespace.replace(".json", ""), data);

      this.emit("load", module);
      return true;
    } catch (err) {
      if (err instanceof Error) Logger.error(`Error while loading ${path}: ${err.stack}`);
      return false;
    }
  }
}
