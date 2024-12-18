const { chatbotResponse } = require("../src/index");
const {
  MESSAGE,
  BLACK_LISTED_WORDS,
  LOGGING_PATH,
} = require("../config/configurations");

describe("chatbotResponse", () => {
  const userId = "<user-id>";

  // happy test cases
  let happyInputList = ["Hello", "Can you help me with my homework?"];
  happyInputList.forEach((input) => {
    test("should return the message (happy case)", () => {
      expect(chatbotResponse(userId, input, LOGGING_PATH.TEST)).toBe(
        `I hear you say: ${input}`
      );
    });
  });

  // black-listed words test cases
  BLACK_LISTED_WORDS.forEach((input) => {
    test("should return false for input containing black-listed words", () => {
      expect(
        chatbotResponse(
          userId,
          `Hey there, how can I (do) ${input} now?`,
          LOGGING_PATH.TEST
        )
      ).toBe(MESSAGE.FAILURE);
    });
  });

  // partially including black-listed words test cases
  let partiallyBlackListedInput = ["whack", "xscam"];
  partiallyBlackListedInput.forEach((input) => {
    test("should return true for input partially containing black-listed words", () => {
      expect(chatbotResponse(userId, input,LOGGING_PATH.TEST)).toBe(
        `I hear you say: ${input}`,
        LOGGING_PATH.TEST
      );
    });
  });

  // bypassed black-listed words test cases
  let bypassedBlackListedInput = [
    "h@ck",
    "sc@m",
    "che@t",
    "d1ck",
    "murd3r",
    "b1tch",
  ];
  bypassedBlackListedInput.forEach((input) => {
    test("should return false for input containing bypassed black-listed words", () => {
      expect(
        chatbotResponse(
          userId,
          `Hey there, how can I (do) ${input} now?`,
          LOGGING_PATH.TEST
        )
      ).toBe(MESSAGE.FAILURE);
    });
  });
});
