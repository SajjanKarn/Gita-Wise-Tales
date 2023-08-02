const generateRandomChapter = () => {
  // from 1 to 18
  return Math.floor(Math.random() * 18) + 1;
};

const generateRandomVerse = () => {
  // from 1 to 20
  return Math.floor(Math.random() * 20) + 1;
};

export { generateRandomChapter, generateRandomVerse };
