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

module.exports = function answerQuestion(question) {
    switch (question.type) {
        case "PRIME":
            const match = question.hint.match(/[0-9]+/g)
            return nthPrime(parseFloat(match[0]))
        case "MAX":
            const [first, second] = question.hint.match(/[0-9]+/g)
            return Math.max(parseFloat(first), parseFloat(second))
        case "CALCULUS":
            const [cal1, cal2] = question.hint.match(/[0-9]+/g)
            const operation = question.hint.match(/(plus|minus|times)/)[0];
            switch (operation) {
                case "plus":
                    return parseFloat(cal1) + parseFloat(cal2)
                case "minus":
                    return parseFloat(cal1) - parseFloat(cal2)
                case "times":
                    return parseFloat(cal1) * parseFloat(cal2)
            }
        default:
            return null
    }
}