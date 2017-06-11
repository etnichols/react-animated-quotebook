var quotes = require( './quotes.js' )

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomQuote = (arr) => {
  //generate random integer between 0 and length of the quotes array.
  let min = Math.ceil(0)
  let max = Math.floor(arr.length)
  let random_index = Math.floor(Math.random() * (max - min)) + min
  return arr[random_index]
}

const printQuote = (obj) => {
  console.log(`QUOTE: ${obj['quote']} AUTHOR: ${obj['author']}`)
}

const runner = () => {
  printQuote(getRandomQuote(quotes))
  setTimeout(() => {
    runner()
  }, 10000)
}

runner();
