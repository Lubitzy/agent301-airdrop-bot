const readlineSync = require('readline-sync')
const colors = require('colors')

function displayHeader() {
    process.stdout.write('\x1Bc') // Membersihkan layar

    const headerBorder = '==========================================='
    console.log(headerBorder.white);
    console.log('=        🚀 Agent301 Airdrop Bot 🚀       ='.white.bold)
    console.log('=            Created by Lubitzy           ='.white)
    console.log('=           https://t.me/lubiqt           ='.white)
    console.log(headerBorder.white);
    console.log();
}

function askUserChoice() {
    console.log('\n🛠️  What would you like to do?'.brightWhite.bold)
    console.log('1. '.brightYellow + 'Default Flow'.brightWhite)
    console.log('2. '.brightYellow + 'Automatic Flow'.brightWhite)
    console.log('0. '.brightRed + 'Exit'.brightWhite)

    return readlineSync.question('\nEnter your choice: '.brightBlue.bold)
}

function askDefaultChoice() {
    console.log('\n📋 Default Flow Menu:'.brightWhite.bold)
    console.log('1. '.brightYellow + 'Auto Daily Login'.brightWhite)
    console.log('2. '.brightYellow + 'Auto Complete Task'.brightWhite)
    console.log('3. '.brightYellow + 'Auto Spin'.brightWhite)
    console.log('0. '.brightRed + 'Back'.brightWhite)

    return readlineSync.question('\nEnter your choice: '.brightBlue.bold)
}

module.exports = {
    displayHeader,
    askUserChoice,
    askDefaultChoice
}
