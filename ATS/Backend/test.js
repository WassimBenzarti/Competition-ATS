
function nthPrime(inp) {
    var count = 0;
    for (var i = 2; i <= 100000; i++) {
        if (isPrime(i)) count = count + 1;
        if (count == inp) return i;
    }
}
function isPrime(i) {
    for (var j = 2; j < i; j++) {
        //instead of `j < i` it can be reduced using other conditions
        if (i % j == 0) {
            return false
        }
    }
    return true
}



function answerQuestion(question) {
    switch (question.type) {
        case "PRIME":
            const match = question.hint.match(/[0-9]+/g)
            return nthPrime(parseFloat(match[0]))

            break;
        case "MAX":
            const [first, second] = question.hint.match(/[0-9]+/g)
            return Math.max(parseFloat(first), parseFloat(second))
            break;
        case "CALCULUS":
            const [cal1, cal2] = question.hint.match(/[0-9]+/g)
            const operation = question.hint.match(/(plus|minus|times)/)[0];
            switch (operation) {
                case "plus":
                    return parseFloat(cal1) + parseFloat(cal2)
                    break;
                case "minus":
                    return parseFloat(cal1) - parseFloat(cal2)
                    break;
                case "times":
                    return parseFloat(cal1) * parseFloat(cal2)
                    break;
            }
            break;
    }
}

console.log(answerQuestion(
    {
        "hint": "What is the 49th prime number ?",
        "_id": "5d4ae7dc2148b871fd922052",
        "type": "PRIME"
    }
))