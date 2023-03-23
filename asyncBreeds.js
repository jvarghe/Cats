/* M01 W04: MORE ASYNC JS: ASYNCHRONOUS RETURN VALUES 
 *
 * This is the asynchronous version of `syncBreeds.js`. In the sync version of
 * this program, breed data is stored in an object. As async code is usually
 * written to deal with delays like reading from a file, for the async version,
 * the data for the cat breeds are stored in separate files in the `Data` 
 * folder.
 * 
 * We will try to read data from the file and return it, but this will fail!
 * 
 * 
 * ASYNCHRONOUS FUNCTIONS CANNOT RETURN DATA
 *  
 * The purpose of this project was to demonstrate the Synchronous functions can 
 * return data but Asynchronous ones cannot!
 * 
 * Why?
 * 
 * Because `fs.readFile` is an asynchronous function, the code inside it gets
 * pushed off the main thread onto the event loop. Because `fs.readFile` no 
 * longer blocks the main thread, it returns `undefined` immediately. At this
 * point, only its callback function connects it the main thread. 
 * 
 * While `fs.readFile` is working to read the file on the event loop, the main
 * thread is unblocked and continues to execute all the synchronous code in this
 * program. And everything in this file is synchronous but for the file read 
 * (`fs.readFile`). For that reason, all the code outside this function call
 * —including the console.log() messages outside `fs.readFile`—will execute 
 * immediately. 
 * 
 * Therefore, while `fs.readFile` is working at read files, the rest of the 
 * synchronous code in the function—including the portion that sits after 
 * `fs.readFile` has already finished executing. As mentioned, `fs.readFile`
 * returns `undefined`. There is no return statement in `breedDetailsFromFile`,
 * so it also returns undefined. 
 * 
 * By the time the callback function in `fs.readFile` completes its task of
 * reading files, the rest of program has already completed its task and prints
 * the following to screen:
 * 
 * 
 *    breedDetailsFromFile: Calling readFile...
 *    Return Value:  undefined
 * 
 * 
 * When the file read completes, it triggers the callback function and sends 
 * back the `data` payload defined in the predicate from `fs.readFile`. This 
 * package is sent back to the main thread via the callback event queue. 
 * However, when it gets back to the main thread, there is no clear way to 
 * return the data package. 
 * 
 * Both `fs.readFile` and `breedDetailsFromFile` have returned their values;
 * `undefined` in both cases. The main thread has finished executing all the
 * synchronous code—the program has essentially finished!
 * 
 * To belabour a fine point: because `fs.readFile` has already returned its 
 * value, the callback function cannot return its payload within this function, 
 * and because `breedDetailsFromFile` has returned its value, the callback 
 * cannot return its payload there either (See the two `Issue` sections in the 
 * code below).
 * 
 * For this reason, there is no return path for the `data` payload. This is a
 * limitation of asynchronous functions in JavaScript. The only thing 
 * `fs.readFile` returns is its console.log() message. This only happens because 
 * it is not a part of the callback function.
 * 
 * Therefore, the async version of this program has output that looks like this:
 * 
 *    breedDetailsFromFile: Calling readFile...
 *    Return Value:  undefined
 *    In readFile's Callback: it has the data.
 * 
 * 
 * `asyncBreeds.js` failed its task because asynchronous programs in JavaScript
 * cannot return data.
 * 
 * 
 * 
 */


// ASYNCHRONOUS FUNCTIONS CANNOT RETURN DATA

// IMPORTS
const fs = require("fs");



// ASYNC FILE READ FUNCTION
// 
// This function reads data from a file and attempts to return it to the caller.
const breedDetailsFromFile = function(breed) {

  
  console.log("breedDetailsFromFile: Calling readFile...");

  // Read from the files in the `Data` folder and print it to console and then,
  // return it. 
  fs.readFile(`./data/${breed}.txt`, "utf8", (error, data) => {

    console.log("In readFile's Callback: it has the data.");

    // ISSUE: Returning from *inner* callback function, not 
    // `breedDetailsFromFile`.
    if (!error) return data;

  });

  // ISSUE: Attempting to return data out here will also not work.
  //        Currently not returning anything from here, so `breedDetailsFromFile`
  //        function returns undefined.
  //        This is synchronous code and thus, has already finished executing
  //        by the time the `fs.readFile` returns (??).
};



// DRIVER CODE:
// We try to get the return value
const bombay = breedDetailsFromFile("Bombay");

// This line will NOT print out details, instead we will see undefined!
console.log("Return Value: ", bombay); 