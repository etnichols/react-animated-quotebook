var quotes = require( './quotes.js' )

for(let i = 0; i < quotes.length; i++){
  let q = quotes[i]['quote']
  let a = quotes[i]['author']
  console.log("quote #" + i + " " + q + " " + a)
}
