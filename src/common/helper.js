/**
 * Get random number between x and y
 * @param {Number} x min number
 * @param {Number} y max number
 * @returns float value
 */
function getRandomNumber(x, y) {
    let minValue = x;
    let maxValue = y;
    if (y < x) {
        minValue = y;
        maxValue = x;
    }
    // Get a random number between 0 and 1.
    let randomNumber = Math.random();

    // Scale the random number to the desired range.
    randomNumber = randomNumber * (maxValue - minValue) + minValue;

    // Return the random number.
    return randomNumber;
}

/**
 * Get random integer: min include and max exclude
 * @param {Integer} min min number
 * @param {Integer} max max number
 * @returns integer value
 */
function getRandomInteger(min, max) {
    let minValue = min;
    let maxValue = max;
    if (max < min) {
        minValue = max;
        maxValue = min;
    }
    //Get random integer: min include and max exclude
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}

module.exports = {
    getRandomInteger,
    getRandomNumber
}