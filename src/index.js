const fs = require("fs");
const readline = require("readline");
const natural = require("natural");
const {
  BLACK_LISTED_WORDS,
  MESSAGE,
  LEET_SPEAK_MAPPING,
  LOGGING_PATH,
} = require("../config/configurations.js");

/**
 * Check if the user input contains black-listed content.
 * @param {string} input - The user input.
 * @returns {boolean} - True if black-listed content is found, false otherwise.
 */
const containsBlackListedContent = (input) => {
  const tokenizer = new natural.WordTokenizer();

  // convert input to lower case
  input = input.toLowerCase();

  // normalize input with bypassing leet speak
  LEET_SPEAK_MAPPING.forEach((mapping) => {
    const regex = new RegExp(mapping[0], "g");
    input = input.replace(regex, mapping[1]);
  });

  // tokenize input to check for black-listed words
  const tokens = tokenizer.tokenize(input);
  return tokens.some((word) => BLACK_LISTED_WORDS.includes(word));
};

/**
 * Log a message to the log file.
 * @param {string} userId - The user ID.
 * @param {string} message - The message to log.
 */
const logMessage = (userId, message, filePath = LOGGING_PATH.PRODUCTION) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} [${userId}]: ${message}\n`;
  fs.appendFileSync(filePath, logEntry);
};

/**
 * Generate response based on user input
 * @param {string} userId - The user ID.
 * @param {string} input - The user input.
 * @returns {string} - The chatbot response.
 */
const chatbotResponse = (userId, input, isTesting) => {
  let response;

  // check if input contain any black-listed words
  if (containsBlackListedContent(input)) {
    response = MESSAGE.FAILURE;
  } else {
    response = `I hear you say: ${input}`;
  }

  // write to log file
  if (!isTesting) {
    logMessage(userId, `User: ${input}`, LOGGING_PATH.PRODUCTION);
    logMessage(userId, `Bot: ${response}`, LOGGING_PATH.PRODUCTION);
  } else {
    logMessage(userId, `User: ${input}`, LOGGING_PATH.TEST);
    logMessage(userId, `Bot: ${response}`, LOGGING_PATH.TEST);
  }

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
};
