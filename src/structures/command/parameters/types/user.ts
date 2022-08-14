import { CommandContext } from "../../context";

export function user(_options: any) {
  return {
    ..._options,
    fetch: _options.fetch ?? false,

    async parse(ctx: CommandContext, argument: string | undefined, options: any) {
      const client = ctx.client;

      if (!argument) throw new Error("Ué");

      const u = options.fetch ? await client.users.fetch(argument) : await client.users.cache.get(argument);
      if (!u) throw new Error("Cannot get user");

      return u;
    },
  };
}
