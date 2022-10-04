// create a function to export 
function getData(callback) {
    console.log(`it's a liveeeeeeeeeee!`);
    console.log(`hello! this is a try`);



     // using the fetch api To go out and get out the data
     fetch(`./data.json`) // go retrieve the data from the file or resource

     // parse the JSON Object -> turn it into a plain JS object 
     .then(res => res.json()) // res means 'response' -> the data we retrieved 
     // res.json() is a built in method or function that turns the JSON into a plain object
     .then(data => {
        console.log(data);

        // build out the team content on the page
        // call back is the reference to the buildTeam function in the main js file 
        callback(data);
     })
     // if anything breaks anywhere along the line, catch the error event  below will catch it 
     // and here report it to the developer.
     .catch(error => console.log(error));
}

export {getData}