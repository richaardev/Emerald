import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
  ApplicationCommandStringOptionData,
} from "discord.js";

export function string(
  data: Omit<ApplicationCommandStringOptionData, "type">,
): ApplicationCommandOptionData {
  return { ...data, type: ApplicationCommandOptionType.String };
}
