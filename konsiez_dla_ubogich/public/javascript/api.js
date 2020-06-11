const urlVoivodeship = 'https://bdl.stat.gov.pl/api/v1/units?level=2&page-size=16&format=json';
const select = document.querySelector('.voivodeships');

const voivodeships = [];
let transformed = [];

request(urlVoivodeship)
    .then(data => {
        transformed = data.map(voivodeship => {
            const transformedData = Object.assign({}, voivodeship);
            transformedData.name = toCapitalLetter(voivodeship.name.toLowerCase());
            return transformedData;
        });
        setOptions(transformed, '.voivodeships');
    });

select.addEventListener('change', evt => {
    const voivodeship = evt.target.value;
    const id = transformed.filter(value => value.name.toLowerCase() == voivodeship.toLowerCase())[0].id;

    let urlCities = `https://bdl.stat.gov.pl/api/v1/units?parent-id=${id}&page-size=100&level=6&format=json`;

    request(urlCities).then(data => {
        let removedSuffixes = data.map(voivodeship => {
            const preparedObject = Object.assign({}, voivodeship);
            if (preparedObject.name.indexOf("-") !== -1) {
                preparedObject.name = preparedObject.name.slice(0, preparedObject.name.indexOf("-"));
            } else preparedObject.name = preparedObject.name;
            return preparedObject;
        });

        const noDuplicates = removeDuplicates(removedSuffixes);
        document.querySelector('.cities').innerHTML = '';
        data.sort((a, b) => a.name - b.name);
        setOptions(noDuplicates, '.cities');
    });
});

function removeDuplicates(array) {
    let noDuplicatesArray = [];
    let uniqueObject = {};
    for (let i in array) {
        objTitle = array[i]['name'].slice(0, array[i]['name'].length).trim();
        uniqueObject[objTitle] = array[i];
    }
    for (i in uniqueObject) {
        noDuplicatesArray.push(uniqueObject[i]);
    }
    return noDuplicatesArray
}

function setOptions(data, select) {
    data.forEach(voivodeship => {
        const option = document.createElement('option');
        const text = document.createTextNode(voivodeship.name);

        option.appendChild(text);
        document.querySelector(select).appendChild(option);
        voivodeships.push(option);
    });
}

async function request(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data.results)
}

const toCapitalLetter = (voivodeship) => {
    return voivodeship.charAt(0).toUpperCase() + voivodeship.slice(1);
};