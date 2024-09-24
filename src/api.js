const axios = require('axios')
const BASE_URL = 'https://api.agent301.org/'

// GET USER POINT BALANCE INFO
async function getBalancePoint(token) {
    const { data } = await axios({
        url: `${BASE_URL}getMe`,
        method: 'POST',
        headers: {
            Authorization: token
        }
    })
    return data.result.balance;
}

// GET USER NOT BALANCE INFO
async function getBalanceNOT(token) {
    const { data } = await axios({
        url: `${BASE_URL}wheel/load`,
        method: 'POST',
        headers: {
            Authorization: token
        }
    })
    return data.result.notcoin;
}

// GET USER TON BALANCE INFO
async function getBalanceTON(token) {
    const { data } = await axios({
        url: `${BASE_URL}wheel/load`,
        method: 'POST',
        headers: {
            Authorization: token
        }
    })
    return data.result.toncoin;
}

// GET USER TICKETS INFO
async function getTickets(token) {
    const { data } = await axios({
        url: `${BASE_URL}getMe`,
        method: 'POST',
        headers: {
            Authorization: token
        }
    })
    return data.result.tickets;
}

// GET TASKS INFO
async function getTypeTask(token) {
    try {
        const { data } = await axios({
            url: `${BASE_URL}getTasks`,
            method: 'POST',
            headers: {
                Authorization: token
            }
        })

        if (Array.isArray(data.result.data)) {
            const types = data.result.data.map(item => {
                if (!item.is_claimed) {
                    item.is_claimed = true
                    if (!item.open_in_telegram) {
                        item.open_in_telegram = true;
                    }
                }
                return item.type; // Return only the type
            })

            return {
                success: true,
                types: types,
                message: 'Tasks retrieved and processed successfully.'
            }
        } else {
            console.log('Data is not an Array');
            return {
                success: false,
                types: [],
                message: 'Data is not an Array or no tasks available.'
            }
        }
    } catch (error) {
        console.error(`❌ Error fetching tasks: ${error.message}`.red);
        return {
            success: false,
            types: [],
            message: `Error fetching tasks: ${error.message}`
        }
    }
}

// CLEAR TASKS BY TYPE
async function clearTasks(token, types) {
    const results = []

    for (const type of types) {
        try {
            const { data } = await axios({
                url: `${BASE_URL}completeTask`,
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                },
                data: { type }
            })
            results.push({
                type: type,
                result: data.result
            })
        } catch (error) {
            results.push({
                type: type,
                error: error.message
            })
        }
    }

    return results
}

// AUTO SPIN
async function autoSpin(token) {
    try {
        let ticketsRemaining = await getTickets(token);
        let results = [];
        while (ticketsRemaining > 0) {
            const { data } = await axios({
                url: `${BASE_URL}wheel/spin`,
                method: 'POST',
                headers: {
                    Authorization: token,
                }
            });
            const reward = data.result.reward;
            let rewardDescription;
            if (reward.startsWith('c')) {
                const pointAmount = parseInt(reward.slice(1));
                rewardDescription = `${pointAmount.toLocaleString()} AP`;
            } else if (reward.startsWith('t')) {
                const ticketAmount = parseInt(reward.slice(1));
                rewardDescription = `${ticketAmount} Ticket${ticketAmount !== 1 ? 's' : ''}`;
            } else if (reward.startsWith('tc')) {
                const tonAmount = parseFloat(reward.slice(2));
                rewardDescription = `${tonAmount.toFixed(2)} TON`;
            } else if (reward.startsWith('nt')) {
                const notAmount = parseInt(reward.slice(2));
                rewardDescription = `${notAmount} NOT`;
            } else {
                rewardDescription = reward;
            }
            results.push(rewardDescription);
            ticketsRemaining--;

            if (ticketsRemaining > 0) {
                console.log(`Waiting 5 seconds before next spin. Tickets remaining: ${ticketsRemaining}`);
                await new Promise(resolve => setTimeout(resolve, 5 * 1000)); // 5 seconds delay
            }
        }
        return results;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.log("Your tickets are now 0.");
        } else {
            throw new Error(`Error during auto spin: ${error.message}`);
        }
    }
}


module.exports = {
    getBalancePoint,
    getBalanceNOT,
    getBalanceTON,
    getTickets,
    getTypeTask,
    clearTasks,
    autoSpin
};
