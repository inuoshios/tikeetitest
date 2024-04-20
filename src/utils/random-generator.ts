const characterTypes = {
  number: "0123456789",
  alphanumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  alphanumeric_upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  alphanumeric_lower: "abcdefghijklmnopqrstuvwxyz0123456789"
};

/**
 * 
 * @param type 
 * @param length 
 * generate random types of characters
 */
export function randomGenerator(type: keyof typeof characterTypes, length: number) {
  let characters = shuffleCharacters(characterTypes[type]);
  let result = '';
  let characterLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * characterLength)];
  }

  return result;
}

// using fisher-yates algorithm to shuffle
function shuffleCharacters<T extends { toString(): string; }>(characters: T) {
  let oldChar = typeof characters === "string"
    ? characters : characters.toString();
  let chars = oldChar.split("");
  let j: number;

  for (let i = chars.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}