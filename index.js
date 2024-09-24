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
    console.error("❌ TOKEN is missing in the environment variables.".red);
    process.exit(1);
}

(async () => {
    displayHeader();
    console.log(`⏳ Please wait, fetching your info...\n`.brightCyan);

    const [point, notcoin, ton, ticket] = await Promise.all([
        getBalancePoint(TOKEN),
        getBalanceNOT(TOKEN),
        getBalanceTON(TOKEN),
        getTickets(TOKEN)
    ]);

    console.log('Hello, this is your data in Agent301'.brightWhite.bold);
    console.log(`Balance Point : ${point}`.brightCyan);
    console.log(`NOT : ${notcoin}`.brightCyan);
    console.log(`TON : ${ton}`.brightCyan);
    console.log(`Ticket : ${ticket}`.brightCyan);

    let choice = askUserChoice();

    if (choice === '1') {
        let defaultChoice = askDefaultChoice();
        const typeResult = await getTypeTask(TOKEN);
        if (typeResult.success) {
            const types = typeResult.types;
            switch (defaultChoice) {
                case '1':
                    console.log("Auto Daily Login Is Not Currently Available");
                    // Tambahkan fungsi untuk auto daily login jika ada
                    break;
                case '2':
                    const clearResults = await clearTasks(TOKEN, types);
                    console.log("Auto Complete Tasks executed:");
                    clearResults.forEach(result => {
                        if (result.error) {
                            console.log(`- Task ${result.type} has been completed before`);
                        } else {
                            console.log(`- Task ${result.type} cleared successfully.`.green);
                        }
                    });
                    // Ambil balance point terbaru setelah menghapus tugas
                    const updatedBalancePoint = await getBalancePoint(TOKEN);
                    console.log(`Updated Balance Point: ${updatedBalancePoint}`.brightCyan);
                    break;
                case '3':
                    console.log("Starting Auto Spin...");
                    const spinResults = await autoSpin(TOKEN);
                    console.log("Auto Spin results:");
                    spinResults.forEach((result, index) => {
                        console.log(`Spin ${index + 1}: ${JSON.stringify(result)}`.brightCyan);
                    });
                    // Ambil balance point terbaru setelah melakukan spin
                    const updatedSpinBalance = await getBalancePoint(TOKEN);
                    console.log(`Updated Balance Point after spins: ${updatedSpinBalance}`.brightCyan);
                    break;
                case '0':
                    console.log("Returning to main menu.");
                    break;
                default:
                    console.log("Invalid choice. Please try again.");
            }
        } else {
            console.log(typeResult.message.red);
        }
    } else if (choice === '2') {
        console.log("Clearing tasks and performing auto spin...");
        const typeResult = await getTypeTask(TOKEN);
        if (typeResult.success) {
            const types = typeResult.types;
            const clearResults = await clearTasks(TOKEN, types);
            clearResults.forEach(result => {
                if (result.error) {
                    console.log(`- Task of ${result.type} has been completed before`);
                } else {
                    console.log(`- Task of type ${result.type} cleared successfully.`.green);
                }
            });
            console.log("Starting Auto Spin...");
            const spinResults = await autoSpin(TOKEN);
            console.log("Auto Spin results:");
            spinResults.forEach((result, index) => {
                console.log(`Spin ${index + 1}: ${JSON.stringify(result)}`.brightCyan);
            });
            // Get updated balance point after spinning
            const finalBalance = await getBalancePoint(TOKEN);
            console.log(`Final Balance Point: ${finalBalance}`.brightCyan);
        } else {
            console.log(typeResult.message.red);
        }
    } else if (choice === '0') {
        console.log("Exiting the application.");
        process.exit(0);
    } else {
        console.log("Invalid choice. Please try again.");
    }
})();