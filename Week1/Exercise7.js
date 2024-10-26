//I have chosen Wikipedia as the website to experiment with.

// Get the Wikipedia logo element
const logo = document.querySelector('#www-wikipedia-org');

// Change the text of the logo
logo.textContent = 'WikiFun';

// Create a new paragraph element
const newParagraph = document.createElement('p');

// Set the text of the new paragraph
newParagraph.textContent = 'This is a fun experiment';

// Add the new paragraph to the page
document.body.appendChild(newParagraph);