# Agent301 Airdrop Bot

🚀 **Agent301 Airdrop Bot** 🚀 is an automation tool created for managing airdrop tasks on the Agent301 platform. The bot supports both manual and automatic modes task completions.

## Features

- Fetch and display user's balance information (Points, NOT, TON, Tickets)
- Auto Complete Tasks: Automatically complete all available tasks
- Auto Spin: Automatically spin the wheel and claim rewards
- Automatic Flow: Combines Auto Complete Tasks and Auto Spin

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Lubitzy/agent301-airdrop-bot.git
   ```

2. Navigate to the project directory:

   ```
   cd agent301-airdrop-bot
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Agent301 API token:

   ```
   TOKEN=your_agent301_api_token
   ```

5. Start the application:

   ```
   node index.js
   ```

## Usage

1. The application will display your current balance information (Points, NOT, TON, Tickets).
2. Choose an option from the main menu:
   - **Default Flow**
     - Auto Daily Login (not implemented yet)
     - Auto Complete Tasks: Automatically complete all available tasks
     - Auto Spin: Automatically spin the wheel and claim rewards
   - **Automatic Flow**: Combines Auto Complete Tasks and Auto Spin
   - **Exit**: Exit the application

The application will execute the selected actions and display the results. Detailed information about the actions performed and the rewards obtained will be shown in the console.

## Getting Your Tokens

1. **Session Storage:**
   - Open the [airdrop bot](https://t.me/Agent301Bot/app?startapp=onetime1191390170).
   - Open your browser’s developer tools (usually F12 or right-click > Inspect).
   - Navigate to the **Application** tab.
   - Look for the **Session Storage** section.
   - Find and copy the key `__init__Params` value of `tgWebAppData`

## Contributing

If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## Donations

If you would like to support the development of this project, you can make a donation using the following addresses:

- **Solana**: `EFBkqR2NtoAYRhtgziTESc2PtAgaGLc8wuTmajBXdfuh`
- **EVM**: `0xE3A3B2b44e5244Eb4159101FDFD596937E54D092`
- **BTC**: `bc1pawnaeky4rks2rkq0rh2ejh3kuuavnqzhvgtckh58nsd69ncfwsssmcdtsc`

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- **Created by:** Lubitzy
- **Telegram Information:** [Lubiqt](https://t.me/Lubiqt)