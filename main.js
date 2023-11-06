#! /usr/bin/env node
import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
import chalk from "chalk";
// create random users
const createUser = () => {
    let users = [];
    for (let i = 1; i <= 5; i++) {
        let user = {
            id: i,
            name: faker.person.fullName(),
            pin: 1000 + i,
            accountNumber: Math.floor(10000 * Math.random() * 10000),
            balance: i * 100000,
        };
        users.push(user);
    }
    return users;
};
// ATM Machine
let run = true;
const atmMachine = async (users) => {
    const res = await inquirer.prompt({
        type: "input",
        message: "Please Enter your 4 digit pin Code: ",
        name: "pin",
        default: "1001 - 1005",
    });
    const user = users.find((v) => v.pin == res.pin);
    if (user) {
        console.log(`\n${chalk.yellow(`<<== Welcome ${user.name} ==>>\n`)}`);
        atmfun(user);
    }
    else {
        console.log(chalk.red("\nPlease enter valid Pin Code.\n"));
    }
};
// ATM Functions
const atmfun = async (user) => {
    while (run) {
        const ans = await inquirer.prompt({
            type: "list",
            name: "option",
            choices: ["Withdrawal", "Deposit", "Check Balance", "Exit"],
            message: "Select Option",
        });
        if (ans.option == "Withdrawal") {
            const amount = await inquirer.prompt({
                type: "number",
                message: "Please enter amount: ",
                name: "withdraw",
            });
            if (amount.withdraw > user.balance) {
                console.log(chalk.red(`\ninsufficient balance.`) + `Your balance is ${user.balance}\n`);
            }
            else {
                user.balance -= amount.withdraw;
                console.log(chalk.green(`\nYour withdrawal amount is: ${amount.withdraw}`));
                console.log(chalk.yellow(`Your remaining balance is: ${user.balance}\n`));
            }
        }
        if (ans.option == "Deposit") {
            const amount = await inquirer.prompt({
                type: "number",
                message: "Please enter amount: ",
                name: "deposit",
            });
            user.balance += amount.deposit;
            console.log(chalk.green(`\nYour deposit amount is: ${amount.deposit}`));
            console.log(chalk.yellow(`Your current balance is: ${user.balance}\n`));
        }
        if (ans.option == "Check Balance") {
            console.log(chalk.yellow(`\nYour Blanace is ${user.balance}\n`));
        }
        if (ans.option == "Exit") {
            console.log(chalk.yellow(`\n<<== Thank you for using ATM ${user.name} ==>>`));
            run = false;
        }
    }
};
const users = createUser();
atmMachine(users);
