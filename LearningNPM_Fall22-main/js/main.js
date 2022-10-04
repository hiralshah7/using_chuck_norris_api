// imports always go at the top of the file
//this is called an IIFE (Inmediatly Invoked Function Expression)
import { getData } from "./modules/dataMiner.js";

//it's a pretty common JavaScript programming pattern
//also called a module file
(() => {
    console.log('fired!');

    let theTeam = document.querySelector('#team-section'),
        theTemplate = document.querySelector('#bio-template').content,
        buttonContainer = document.querySelector('.queryControls') 

        // just a test to see if this is imported properly


    function buildTeam(data) {
        //get all the keys (names) from the data object and use that to iterate through the data
        // debugger;
        const people = Object.keys(data); // Object.keys creates an array

        people.forEach(prof => {
            // copy the template's contents
            let panel = theTemplate.cloneNode(true);

            // get a reference to the template's elements
            let containers = panel.firstElementChild.children;

            // grab the image from the object and set it as the source
            containers[0].querySelector('img').src = `images/${data[prof].avatar}`;

            containers[1].textContent = data[prof].name;
            containers[2].textContent = data[prof].role;
            containers[3].textContent = data[prof].nickname;

            theTeam.appendChild(panel);
        }) 
    }

        function buildJoke(joke) {
            let jokeText = document.querySelector('.query-result');

            jokeText.textContent = joke.value;
            // debugger;
        }

        function addCatbuttons (categories) {
            // debugger;
            let activeButtons = categories.slice(0,6);

            // below is the filter script to remove the explicit content or any other type of content use the below script 

            // let activeButtons = categories.filter(item => item !== 'explicit').slice(0,6);

            activeButtons.forEach(button => {
                let buttonEl = `<button class="joke-button" data-cat=${button}>${button}</button>`;

                buttonContainer.innerHTML += buttonEl;
            })
        }

        function getJoke(event) {
            // debugger;
            // if there is not a category on a click then dont do anything
            // because that will just throw an error => category targetCategory will not be defined
            if (!event.target.dataset) { return;}
            // if there is a custom data attribute clicked on a button , retrieve it and use that as the category
            // query parameter

            let targetCategory = event.target.dataset.cat;

            getData(`https://api.chucknorris.io/jokes/random?category=${targetCategory}`, buildJoke);
        }
    // getData('./data.json',buildTeam);
    // getData('https://api.chucknorris.io/jokes/random', buildJoke)

    // use event delegation to handle click on each buttons
    buttonContainer.addEventListener('click', getJoke);

    getData ('https://api.chucknorris.io/jokes/categories', addCatbuttons);
})();