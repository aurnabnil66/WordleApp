export const fetchWordData = async (word: string) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    if (!response.ok) throw new Error('Word not found');

    const data = await response.json();
    return data[0]; // assuming we're only interested in the first result
  } catch (error) {
    console.error('Failed to fetch word data:', error);
    return null;
  }
};
