const ThrottleError = require("./ThrottleError")

module.exports = function detectApiError(result) {
    if (result.status === false) {
        const [secondsToWait] = parseNumbers(result.message);
        throw new ThrottleError(secondsToWait * 1000)
    }
    return result
}