const fs = require("fs");
const readline = require("readline");
const natural = require("natural");

// Black-listed words list
const BLACK_LISTED_WORDS = [
  "hack",
  "hacking",
  "scam",
  "scamming",
  "cheat",
  "cheating",
  "plagiarism",
];

// messages used within the program and unit tests
const MESSAGE = {
  INSTRUCTION:
    "Welcome to Chatbot Nursery! Type 'exit' or 'quit' to close the session.",
  PROMPT: "How may I assist you today?",
  GOODBYE: "Until next time",
  FAILURE: "I'm sorry, but I can't assist with that request.",
};

/**
 * Check if the user input contains black-listed content.
 * @param {string} input - The user input.
 * @returns {boolean} - True if black-listed content is found, false otherwise.
 */
const containsBlackListedContent = (input) => {
  const tokenizer = new natural.WordTokenizer();

  // normalize input
  const tokens = tokenizer.tokenize(input.toLowerCase().replace(/[@]/g, "a"));
  console.log(tokens);
  return tokens.some((word) => BLACK_LISTED_WORDS.includes(word));
};

/**
 * Log a message to the log file.
 * @param {string} userId - The user ID.
 * @param {string} message - The message to log.
 */
const logMessage = (userId, message) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} [${userId}]: ${message}\n`;
  fs.appendFileSync("chatbot_log.txt", logEntry);
};

/**
 * Generate response based on user input
 * @param {string} userId - The user ID.
 * @param {string} input - The user input.
 * @returns {string} - The chatbot response.
 */
const chatbotResponse = (userId, input) => {
  let response;

  // check if input contain any black-listed words
  if (containsBlackListedContent(input)) {
    response = MESSAGE.FAILURE;
  } else {
    response = `I hear you say: ${input}`;
  }

  // write to log file
  logMessage(userId, `User: ${input}`);
  logMessage(userId, `Bot: ${response}`);

  return response;
};

const initializeChatbot = () => {
  // Set up command-line interface
  const lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(MESSAGE.INSTRUCTION);
  lineReader.question("Enter your User ID: ", (userId) => {
    console.log(`Welcome, ${userId}! ${MESSAGE.PROMPT}`);

    lineReader.prompt();
    lineReader.on("line", (input) => {
      // exit program
      if (input.toLowerCase() === "exit" || input.toLowerCase() === "quit") {
        console.log(`${MESSAGE.GOODBYE}, ${userId}!`);
        lineReader.close();
      } else {
        // generate response based on input
        const response = chatbotResponse(userId, input);
        console.log(response);
        lineReader.prompt();
      }
    });
  });
};

// start operating the chatbot
initializeChatbot();

module.exports = {
  chatbotResponse,
  MESSAGE,
  BLACK_LISTED_WORDS,
};
