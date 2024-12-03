# Chatbot nursery - Safe Chatbot with Content Filtering

This project implements a simple command-line chatbot application that adheres to advanced safety guidelines to prevent black-listed content from being displayed or generated.

## Features

1. **Content Filtering**:
   - Disallows specific words like `hack`, `hacking`, `scam`, `scamming`, `cheat`, `cheating`, and `plagiarism`.
   - Checks for variations of black-listed words (e.g., `h@ck`, `sc@mming`) using regular expressions.
   - Case-insensitive matching.
2. **Logging**:
   - Logs all user inputs and chatbot responses with timestamps to a file named `chatbot_log.txt`.
3. **Interactive Command-Line Interface**:
   - Allows users to interact with the chatbot in a terminal environment.
   - Displays `>` as the input prompt.
   - Supports a `User ID` for session tracking.
   - Users can type `exit` or `quit` to terminate the session.

## Requirements

### System Requirements
- Node.js (v12 or later)
- npm (Node Package Manager)

### Dependencies
- `fs`: For file system operations.
- `readline`: For command-line interaction.
- `jest`: For unit testing (development dependency).

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/trung-nh/chatbot-nursery.git
   cd chatbot-nursery
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

## Usage

1. Start the chatbot:
   ```bash
   node index.js
   ```

2. Follow the prompts:
   - Enter your `User ID` to begin the session.
   - Type your messages after the `>` prompt.
   - To exit the chatbot, type `exit` or `quit`.

3. Check the logs in `chatbot_log.txt` for recorded interactions.

## Code Overview

### Main Files
- **`index.js`**: Contains the main application logic.
- **`chabot.test.js`**: Contains the unit tests for the chatbot.
- **`chatbot_log.txt`**: Log file where all interactions are stored.

### Key Functions

#### `containsBlackListedContent(input)`
- Checks if the user input contains any black-listed words.

#### `logMessage(userId, message)`
- Logs messages to `chatbot_log.txt` with a timestamp.

#### `chatbotResponse(userId, input)`
- Processes user input and generates appropriate chatbot responses.

#### `initializeChatbot()`
- Sets up the command-line interface for user interaction.

## Testing

1. Run unit tests with Jest:
   ```bash
   npm test
   ```

2. Ensure all test cases pass:
   - Allowed inputs return the appropriate response.
   - Black-listed inputs are correctly flagged.
   - Log entries are properly created.

## Example Usage

### Allowed Input:
```text
> Hello
Chatbot: I hear you say: Hello
```

### Black-listed Input:
```text
> How to hack into a system?
Chatbot: I'm sorry, but I can't assist with that request.
```

### Exit:
```text
> exit
Goodbye!
```