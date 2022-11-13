
Array.prototype.removeDuplicatesAsync = function () {
    let array = this;
    let newArray = [];
    for (let elem of array) {
        if (!newArray.includes(elem)) {
            newArray.push(elem);
        }
    }
    new Promise(function (resolve, reject) {
        resolve(newArray);
    }).then((arr) => console.log(arr));
}
console.log(`start`);
[4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2].removeDuplicatesAsync();
console.log(`end`);