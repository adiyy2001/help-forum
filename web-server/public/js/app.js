const weatherForm = document.querySelector('.weather-form');
weatherForm.addEventListener('submit', event => {
    event.preventDefault();

    const location = event.target[0].value;
    const url = `/weather?address=${location}`;

        fetch(url)
        .then(res => res.json())
        .then(res => {
            if (res.error) console.log(res.error)
            else {
                const results = document.querySelector('.results');
                results.firstElementChild.innerHTML = '';
                results.lastElementChild.innerHTML = '';
                results.firstElementChild.insertAdjacentText('afterbegin',res.location);
                results.lastElementChild.insertAdjacentText('beforeend',res.forecast);
            }
        });
})
