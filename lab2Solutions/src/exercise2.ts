
let bankAccount:{
    money: number,
    deposit(value:number):void
}={
    money: 2000,
    deposit(value:number){
        this.money+=value
    }

};

let myself:{
    name:string,
    bankAccount:typeof bankAccount,
    hobies:string[]

}={
    name:"john",
    bankAccount:bankAccount,
    hobies:["violin","Cooking"],

};
myself.bankAccount.deposit(3000); 
console.log(myself);




