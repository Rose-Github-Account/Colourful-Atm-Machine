#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 5000;
let myPin = 1234;
console.log(chalk.blue("\n\tWelcome to code with Nida - ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin number:")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is Correct,Login Successfully!\n"));
    console.log(`Current account balance is ${myBalance}`);
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawal method",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [2000, 3000, 4000, 10000, 4000, 7000]
                }
            ]);
            if (fastCashAns > myBalance) {
                console.log(chalk.red("Insufficent Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdraw Successfully`);
                console.log(`Your remaining balance is ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log("Insufficent Balance");
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} withdraw Successfully`);
                console.log(`Your remaining Balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your account Balance is: ${myBalance}`);
    }
}
else {
    console.log(chalk.red("Incorrect pin."));
}
