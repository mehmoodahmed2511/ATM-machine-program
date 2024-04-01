
let userBalance: number = 0;

import inquirer from "inquirer";
let Name = await inquirer.prompt([{
    name: "Name",
    type: "string",
    message: "\nEnter your name"
}
]);
let userName = Name.Name;
let setPin = await inquirer.prompt([{
    message: "please create a strong pin",
    type: "number",
    name: "setPin"
}]);

while (true) {
    let pin = await inquirer.prompt([{
        name: "pin",
        type: "number",
        message: "Enter a pin to login"
    }]);

    let userPin = pin.pin;
    if (userPin === setPin.setPin) {
        console.log("\nLogged in successfully");
        let operations = await inquirer.prompt([{
            name: "operations",
            type: "list",
            message: "\nPlease select an option",
            choices: ["Check Balance", "Deposit Amount", "Withdraw amount"]
        }]);
        if (operations.operations === "Check Balance") {
            console.log("\nYour current balance is: ", userBalance);
        }
        else if (operations.operations === "Deposit Amount") {
            let AmountDeposit = await inquirer.prompt([{
                name: "AmountDeposit",
                type: "number",
                message: "\nPlease enter amount to deposit in your account",
            }]);
            let AmountDeposited = AmountDeposit.AmountDeposit;
            if (AmountDeposited > 100000) {
                console.log("\nYou exceeded transaction limit (100,000), please enter amount within the range")
            }
            else if (AmountDeposited <= 100000) {
                let NewBalance: number = AmountDeposited + userBalance;
                console.log("\nAmount deposited successfully!", "\nYour current balance is", NewBalance);
                userBalance += NewBalance;
            }
        }

        else if (operations.operations === "Withdraw amount") {
            let withdrawAmount = await inquirer.prompt([{
                name: "withdrawAmount",
                type: "number",
                message: "\nEnter amount to withdraw"
            }]);
            if (withdrawAmount.withdrawAmount > userBalance) {
                console.log("\nYour amount is greater than your current balance, please enter a valid amount")
            }
            else if (withdrawAmount.withdrawAmount <= userBalance) {
                let remainingBalance: number = userBalance - withdrawAmount.withdrawAmount;
                console.log("\Amount withdrawl successfully!");
                console.log("\nYour current balance is: ", remainingBalance);
                userBalance = remainingBalance;
            }
        }
    }

    else {
        console.log("\nYou entered a wrong pin");
    }
    let again = await inquirer.prompt([{
        message: "\nDo you want to perform another transaction?",
        type: "list",
        name: "again",
        choices: ["Yes", "No"]
    }])

    if (again.again === "No") {
        console.log("\nThankyou", userName, "for using our ATM application!");
        break;
    }
}





