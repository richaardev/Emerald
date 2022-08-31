import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
  ApplicationCommandUserOptionData,
} from "discord.js";

export function user(
  data: Omit<ApplicationCommandUserOptionData, "type">,
): ApplicationCommandOptionData {
  return { ...data, type: ApplicationCommandOptionType.User };
}
