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

let currentUser = "loggedout";
let sceneHistory = ["welcome"];
let scene = "welcome";

rl.on("close", () => {
    console.log("\nSee ya bak coy");
    process.exit(0);
});

rl.on('history', (history) => {
    if (history[0] == "debug") {
        console.log(history);
    }

    if (history[0] == "0") {
        if (scene == "welcome") {
            rl.close();
        } else if (currentUser == "loggedout") {
            scene = "welcome";
            updateScene();
        } else {
            scene = "systemaccess";
            updateScene();
        }
    }

    if (history[0] == "back") {
        if (history.length < 2) {
            scene = "welcome";
            updateScene();
            return
        }

        scene = history[history.length -2];
    }

    if (history[0] == "hist") {
        console.log(hist, "\n");
    }
});

updateScene();

async function updateScene () {
    history.push(scene);

    switch (scene) {
        case "help":
            helpScene 
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

async function welcomeScene () {
    const input = await prompt(`
Yo chigga, what can we do for you today?
Lose lipid today by ` + tips[Math.floor(Math.random()*tips.length)] + `

0 to exit
1 to login
2 to create account
3 for credits
`);


}

async function loginScene () {

}