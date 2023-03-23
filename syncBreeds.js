/* M01 W04: MORE ASYNC JS: ASYNCHRONOUS RETURN VALUES 
 *
 * We've been playing with asynchronous functions that do things like reading 
 * input from `stdin`, or running code later with `setTimeout`, but what about 
 * asynchronous functions that need to compute and return data? We have not yet 
 * tackled a situation like this, where our asynchronous function needs to 
 * compute and return data. It's a common need, though. Now is a good time to 
 * learn this. 
 * 
 */



// SYNCHRONOUS FUNCTIONS CAN RETURN DATA

// An object that contains a list of cat breeds.
const catBreeds = {
  'Balinese': "Balinese are curious, outgoing, intelligent cats with excellent communication skills. They are known for their chatty personalities and are always eager to tell you their views on life, love, and what you’ve served them for dinner.",
  'Bombay': "The golden eyes and the shiny black coat of the Bombay is absolutely striking. Likely to bond most with one family member, the Bombay will follow you from room to room and will almost always have something to say about what you are doing, loving attention and to be carried around, often on his caregiver's shoulder."
};


// This is a Synchronous Function that fetches a Cat Breed.
const breedDetails = function(breed) {
  // can simply return it (easy peezee, butter squeezy) ...
  return catBreeds[breed];
};


// DRIVER CODE
// gGet the return value right away from the function
const bombay = breedDetails('Bombay');

// Prints out the description for that breed
console.log(bombay); 

