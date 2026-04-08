export function capitalize(word: string): string {
  const [firstCharacter = "", ...remainingCharacters] = word;

  return firstCharacter.toUpperCase() + remainingCharacters.join("");
}
