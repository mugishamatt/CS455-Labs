let fibonnachi = (function () {
  let store = new Map();

  function fibo(n) {
    let result;
    if (store.has(n)) {
      result = store.get(n);
    } else{
     if (n <= 2) {
      result = 1;
    } else {
      result = fibo(n - 1) + fibo(n - 2);
    }
    store.set(n, result);
  }
  return result;
}
 return fibo;

})();

// not memoized version

function fibonacci2(n) {
    if (n <= 2) {
        return 1;
    }
    return fibonacci2(n - 1) + fibonacci2(n - 2);
}

console.time("memoized")
console.log(fibonnachi(30));
console.timeEnd("memoized")

console.time(" not memoized")
console.log(fibonacci2(30));
console.timeEnd(" not memoized")







