require('dotenv').config();
const colors = require('colors');
const {
    getBalancePoint,
    getBalanceNOT,
    getBalanceTON,
    getTickets,
    getTypeTask,
    clearTasks,
    autoSpin
} = require('./src/api');
const {
    displayHeader,
    askUserChoice,
    askDefaultChoice
} = require('./src/ui');

const TOKEN = process.env.TOKEN;

if (!TOKEN) {
    console.error("❌ Error: TOKEN is missing in the environment variables.".red);
    process.exit(1);
}

(async () => {
    displayHeader();
    console.log(`⏳ Fetching your account details, please wait...\n`.cyan);

    try {
        const [point, notcoin, ton, ticket] = await Promise.all([
            getBalancePoint(TOKEN),
            getBalanceNOT(TOKEN),
            getBalanceTON(TOKEN),
            getTickets(TOKEN)
        ]);

        console.log('👋 Welcome! Here is your account information:'.bold.white);
        console.log(`💰 Balance Points: ${point}`.white);
        console.log(`🔸 NOT Coins: ${notcoin}`.white);
        console.log(`💎 TON Coins: ${ton}`.white);
        console.log(`🎟️  Tickets: ${ticket}\n`.white);

        let choice = askUserChoice();

        if (choice === '1') {
            let defaultChoice = askDefaultChoice();
            const typeResult = await getTypeTask(TOKEN);

            if (typeResult.success) {
                const types = typeResult.types;

                switch (defaultChoice) {
                    case '1':
                        console.log("ℹ️ Auto Daily Login feature is not available at the moment.".yellow);
                        // Add auto daily login functionality if available
                        break;
                    case '2':
                        await clearTasks(TOKEN, types);
                        // Fetch updated balance point after completing tasks
                        const updatedBalancePoint = await getBalancePoint(TOKEN);
                        console.log(`🔄 Updated Balance Points: ${updatedBalancePoint}`.brightCyan);
                        break;
                    case '3':
                        console.log("🎰 Starting Auto Spin...".cyan);
                        const spinResults = await autoSpin(TOKEN);
                        console.log("🔄 Auto Spin results:");
                        spinResults.forEach((result, index) => {
                            console.log(`- Spin ${index + 1}: ${result}`.brightCyan);
                        });
                        // Fetch updated balance point after spins
                        const updatedSpinBalance = await getBalancePoint(TOKEN);
                        console.log(`🔄 Updated Balance Points after spins: ${updatedSpinBalance}`.brightCyan);
                        break;
                    case '0':
                        console.log("🔙 Returning to the main menu.".cyan);
                        break;
                    default:
                        console.log("⚠️ Invalid selection. Please choose a valid option.".yellow);
                }
            } else {
                console.log(typeResult.message.red);
            }
        } else if (choice === '2') {
            console.log("🧹 Clearing tasks and starting Auto Spin...".cyan);
            const typeResult = await getTypeTask(TOKEN);

            if (typeResult.success) {
                const types = typeResult.types;
                const clearResults = await clearTasks(TOKEN, types);

                clearResults.forEach(result => {
                    if (result.error) {
                        console.log(`- Task '${result.type}' has already been completed.`.yellow);
                    } else {
                        console.log(`- Task '${result.type}' completed successfully.`.green);
                    }
                });

                console.log("🎰 Starting Auto Spin...".cyan);
                const spinResults = await autoSpin(TOKEN);
                console.log("🔄 Auto Spin results:");
                spinResults.forEach((result, index) => {
                    console.log(`- Spin ${index + 1}: ${result}`.brightCyan);
                });

                // Fetch updated balance point after spinning
                const finalBalance = await getBalancePoint(TOKEN);
                console.log(`💰 Final Balance Points: ${finalBalance}`.brightCyan);
            } else {
                console.log(typeResult.message.red);
            }
        } else if (choice === '0') {
            console.log("👋 Exiting the application. Goodbye!".green);
            process.exit(0);
        } else {
            console.log("⚠️ Invalid selection. Please try again.".yellow);
        }
    } catch (error) {
        console.error(`❌ An error occurred: ${error.message}`.red);
    }
})();
