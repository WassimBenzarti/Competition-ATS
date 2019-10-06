module.exports = function parseNumbers(str) {
    return str.match(/[0-9.]+/g)
        .map(parseFloat);
}