const natural = require("natural");
const {
  LEET_SPEAK_MAPPING,
  BLACK_LISTED_WORDS,
  LOGGING_PATH,
  MESSAGE,
} = require("../../config/configurations");
const { logMessage } = require("../utils/logging");

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
module.exports = {
  containsBlackListedContent,
  chatbotResponse,
};
