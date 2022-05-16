// all the amounts
let woman = 0;
let men = 0;
let ageTotal = 0;

function resetStats(womanID, menID, averageID) {
    woman = 0;
    men = 0;
    ageTotal = 0;
    womanID.innerHTML = woman + ' vrouwen';
    menID.innerHTML = men + ' mannen';
    averageID.innerHTML = ageTotal + ' jaar gemiddeld';
}

// refreshes the stats
const getStats = (womanID, menID, averageID) => {

    if (woman === 1) {
        womanID.innerHTML = woman + ' vrouw';
    } else {
        womanID.innerHTML = woman + ' vrouwen';
    }

    if (men === 1) {
        menID.innerHTML = men + ' man';
    } else {
        menID.innerHTML = men + ' mannen';
    }

    averageID.innerHTML = Math.floor(ageTotal / (woman + men)) + ' jaar gemiddeld';
}

// makes a div from the response
const renderResponse = (res, peopleCards) => {

    // als handeling fout gaat
    if (!res) {
        console.log(res.status);
    }

    for (let i = 0; i < res.results.length; i++) {

        if (res.results[i].gender === 'male') {
            men++;
        } else {
            woman++;
        }

        ageTotal += res.results[i].dob.age;

        let firstName = res.results[i].name.first;
        let lastName = res.results[i].name.last;
        let name = firstName + ' ' + lastName;

        var newCol = document.createElement('div');
        newCol.className = 'col-12 col-sm-6 col-lg-4 col-xl-3';

        peopleCards.prepend(newCol);

        var newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.innerHTML = '<img src="' +
            res.results[i].picture.large +
            '" class="card-img-top" alt="...">';

        var newCardBody = document.createElement('div');
        newCardBody.className = 'card-body';
        newCardBody.innerHTML = '<h5 class="card-title">' +
            name +
            '</h5> <p class="card-text">' +
            res.results[i].dob.age +
            ' jaar oud <br> Nationaliteit: ' +
            res.results[i].nat
            + '</p>';

        newCard.appendChild(newCardBody);

        newCol.appendChild(newCard);

    }
}

export { renderResponse, getStats, resetStats };