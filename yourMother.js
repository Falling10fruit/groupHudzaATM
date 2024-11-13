const tips = [
    "avoiding processed foods",
    "avoiding sugar",
    "avoid carbs in the evening",
    "be active",
    "avoid eating out",
    "sleeping plenty",
    "eating your calories, don't drink 'em",
    "staying hydrated",
    "staying away from the voices"
];

const fs = require("fs");
const readLinusTechTips = require("readline");
const rl = readLinusTechTips.Interface(process.stdin, process.stdout);

const prompt = (query) => new Promise((resolve) => { rl.question(query, resolve)});

let currentUser = {
    accountID: "loggedout",
    PIN: undefined
};
let sceneHistory = ["welcome"];
let scene = "welcome";
let database = {
    placeholder: {
        PIN: 6969,
        balance: 420
    }
};
let currentHistory = [];

if (fs.existsSync("basedBas.json")) {
    fs.readFile("basedBase.json", "utf-8", (error, data) => {
        if (error) console.error(error);
    
        database = JSON.parse(data);
    });
}

updateScene();

rl.on("close", () => {
    fs.writeFileSync("basedBase.json", JSON.stringify(database));
    console.log("\nSee ya bak coy");
    process.exit(0);
});

rl.on("line", updateScene);

rl.on('history', (history) => {
    currentHistory = history.slice;
    otherCases(history[0]);
});

async function otherCases(input) {
    if (input == "debug") {
        console.log("\nhistory: ", history);
        scene = "debug";
    }

    if (input == "help") {
        scene = "help";
    }

    if (input == "0") {
        if (scene == "welcome") {
            rl.close();
        } else if (currentUser == "loggedout") {
            scene = "welcome";

        } else {
            scene = "mainmenu";
        }
    }

    if (input == "back") {
        if (sceneHistory.length < 2) {
            scene = "welcome";

            return
        }

        scene = sceneHistory[sceneHistory.length -2];
    }
}

async function updateScene () {
    console.log("\nredirecting to scene " + scene);

    sceneHistory.push(scene);

    switch (scene) {
        case "help":
            helpScene();
            break;
        case "debug":
            debugScene();
            break;
        case "welcome":
            welcomeScene();
            break;
        case "login":
            loginScene();
            break;
        case "attemptaccountnumber":
            attemptaccountnumberScene();
            break;
        case "attemptaccountpin":
            attemptaccountpinScene()
        case "createaccount":
            createaccountScene();
            break;
        default:
            if (currentUser.PIN == undefined) {
                scene = "welcome";
                welcomeScene();
            } else {
                mainmenuScene();
            }
    }
}

async function helpScene () {
    console.log(`
List of global commands:
help | returns this screen
0    | returns to the system access. If current page is system access, logs out to welcome page
back | returns to previous screen
hist | returns a list of previous screens
`);
}

async function debugScene () {
    console.log(`\nsceneHistory: `, sceneHistory);
}

async function welcomeScene () {
    const input = await prompt(`
Yo chigga, what can we do for you today?
Lose lipid today by ` + tips[Math.floor(Math.random()*tips.length)] + `

0 to exit
1 to login
2 to create account
3 for credits
`);

    switch (input) { // "0" cases are handled by otherCases
        case "1":
            scene = "login";
            break;
        case "2":
            scene = "createaccount"
            break;
        case "3":
            scene = "credits"
            break;
        default:
            otherCases(input);
    }

    updateScene(); // eyo switch cases are sync
}

async function loginScene () {
    console.log("\nWelcome back my little boy hehe");
    scene = "attemptaccountnumber";
    updateScene();
}

async function attemptaccountnumberScene () {
    const inputaccountnumber = await prompt("\nWhat is your account number: ");

    if (database["account" + inputaccountnumber] == undefined) {
        console.log("\nAccount not found (input help for global commands)")
    } else {
        currentUser.accountID = "account" + inputaccountnumber;
        scene = "attemptaccountpin";
    }

    updateScene();
}

async function attemptaccountpinScene () {
    const inputaccountpin = await prompt("\nInput account PIN: ");

    if (database[currentUser.accountID].PIN == inputaccountpin) {
        currentUser.PIN = inputaccountpin;
        scene = "mainmenu";
    } else {
        console.log("\nRecieved PIN is incorrect");
    }

    updateScene();
}

async function createaccountScene () {
    const inputaccountpin = await prompt(`
Welcome to the A(nguish)T(o)M(ortals)!
What is your PIN? `);

    if (inputaccountpin.length != 4) {
        console.log("\nPIN must be four numbers long");
    } else if (parseInt(inputaccountpin) != inputaccountpin) {
        console.log("\PIN must be an integer");
    } else {
        const accountnumber = Math.floor(Math.random()*5);

        database["account" + accountnumber] = {
            PIN: inputaccountpin,
            balance: 0
        };

        scene = "mainmenu";
    }

    updateScene();
}

async function mainmenuScene () {
    const input = await prompt(`
Welcome home master...
What would you like to do today?~

0 | the fuck nigga im out
1 | Check balance
2 | Deposit
3 | Withdraw
4 | Change PIN
`);

    switch (input) {
        case "1":
            scene = "balance";
            break;
        case "2":
            scene = "deposit";
            break;
        case "3":
            scene = "withdraw";
            break;
        case "4":
            scene = "changepin";
            break;
        default:
            otherCases(input);
    }

    updateScene();
}

async function balance () {
    console.log("\nYour current balance is: ")
}