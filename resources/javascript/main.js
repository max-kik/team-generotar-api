
import { renderResponse, getStats, resetStats } from './helperFunctions.js';

const inputGender = document.getElementById('inputGroupSelect04'); // select gender
const peopleCards = document.getElementById('peopleCards'); // div for the cards
const create = document.getElementById('submit'); // submit button 

// the stats 
const woman = document.getElementById('woman');
const men = document.getElementById('men');
const average = document.getElementById('average');

// get amount of users and alerts for wrong input
const amountOfUsers = document.getElementById('amountOfUsers');
const integerAlert = document.getElementById('integerAlert');
const amountAlert = document.getElementById('amountAlert');

const nationality = document.getElementById('nationality'); // get nationality
const reset = document.getElementById('reset'); // reset button

// generates the endpoint for the api
const getEndpoint = () => {
    const url = 'https://randomuser.me/api/';
    const genderParams = '?gender=';
    const amountParams = '&results=';
    const natParams = '&nat='
    const include = '&inc = gender, name, dob, nat';

    let endpoint =
        url +
        genderParams + getGender() +
        amountParams + getAmountOfUsers() +
        natParams + getNationality() +
        include;

    return endpoint;
}

const getNationality = () => {
    return nationality.value;
}

const getAmountOfUsers = () => {
    return parseInt(amountOfUsers.value);
}

// checks if the input is a integer
const checkAmountOfUsers = () => {

    const users = parseInt(amountOfUsers.value);
    const integerCheck = Number.isInteger(users);

    if (integerCheck) {
        if (users < 1 || users > 100) {
            amountAlert.style.display = 'block';
            setTimeout(() => {
                amountAlert.style.display = 'none';
            }, 2000)
        } else {
            getPeople();

        }

    } else {
        integerAlert.style.display = 'block';
        setTimeout(() => {
            integerAlert.style.display = 'none';
        }, 2000)
    }
}

const getGender = () => {
    let genderOut = '';

    if (inputGender.value === '1') {
        genderOut = 'female';
    } else if (inputGender.value === '2') {
        genderOut = 'male';
    }
    return genderOut;
}

// does the get request
const getPeople = async () => {

    const endpoint = getEndpoint();

    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const jsonResponse = await response.json();
            renderResponse(jsonResponse, peopleCards);
            getStats(woman, men, average);
        }
    } catch (error) {
        console.log(error);
    }

}

const resetAll = () => {

    resetStats(woman, men, average);
    peopleCards.innerHTML = '';
}

create.addEventListener('click', checkAmountOfUsers);
reset.addEventListener('click', resetAll);