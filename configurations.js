// Black-listed words list
const BLACK_LISTED_WORDS = [
  "hack",
  "hacking",
  "scam",
  "scamming",
  "cheat",
  "cheating",
  "plagiarism",
  "stupid",
  "idiot",
  "bitch",
  "cunt",
  "dick",
  "murder",
  "kill"
];

// messages used within the program and unit tests
const MESSAGE = {
  INSTRUCTION:
    "Welcome to Chatbot Nursery! Type 'exit' or 'quit' to close the session.",
  PROMPT: "How may I assist you today?",
  GOODBYE: "Until next time",
  FAILURE: "I'm sorry, but I can't assist with that request.",
};

const LEET_SPEAK_MAPPING = [
  ["@", "a"],
  ["3", "e"],
  ["€", "e"],
  ["£", "e"],
  ["9", "g"],
  ["5", "s"],
  ["0", "o"],
  ["2", "z"],
  ["¥", "y"],
  ["1", "i"],
];

module.exports = {
  BLACK_LISTED_WORDS,
  MESSAGE,
  LEET_SPEAK_MAPPING
};
