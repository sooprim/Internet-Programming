//Functions
function addNumbers(a, b) //Add
{ return a + b;}

function multiplyNumbers(a, b) //Multiply
{return a * b;}

function greet(firstname, lastname) //Greeting
{return `Hello, ${firstname} ${lastname}`;}

function uppercaseText(text) //Uppercase
{return text.toUpperCase();}

//Calling Functions
const add = addNumbers(5, 10);
console.log(`5 + 10 = ${add}`);

const multiply = multiplyNumbers(5, 10);
console.log(`5 * 10 = ${multiply}`);

const message = greet("Jovan", "Tone");
console.log(message);

const uppercaseMessage = uppercaseText("five six one eight");
console.log(uppercaseMessage);