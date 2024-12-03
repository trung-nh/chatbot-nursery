const readline = require("readline");
const { MESSAGE } = require("../config/configurations.js");
const { chatbotResponse } = require("./utils/sanitizeInput.js");

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
