export function hexToDec(color: string) {
  return parseInt(color.replace("#", ""));
}

export default {
  default: hexToDec("#25CB94"),
};
