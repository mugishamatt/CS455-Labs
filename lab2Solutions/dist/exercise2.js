"use strict";
let bankAccount = {
    money: 2000,
    deposit(value) {
        this.money += value;
    }
};
let myself = {
    name: "john",
    bankAccount: bankAccount,
    hobies: ["violin", "Cooking"],
};
myself.bankAccount.deposit(3000);
console.log(myself);
