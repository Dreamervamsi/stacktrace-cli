import '../dist/cli.js';
function recursiveCrash(n) {
    if (n === 0) {
       const data = undefined;
        return data.access; 
    }
    return recursiveCrash(n - 1);
}

console.log("--- Triggering Massive Recursive Error ---");
recursiveCrash(1000);