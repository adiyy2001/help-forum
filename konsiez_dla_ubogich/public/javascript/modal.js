const modal = document.querySelector(".add-post");
const btn = document.querySelector('#addPost')
const close = document.querySelector('.close');

btn.addEventListener('click', evt => {
    modal.style.display = "block";
})

// close.addEventListener('click', evt => {
//     modal.style.display = "none;"
// })

window.addEventListener('click', () => {
    if (event.target === modal) modal.style.display = "none";
})

let contactBtn = document.querySelector('.add-contact');
contactBtn.addEventListener('click', evt => {
    console.log(evt.target.parentElement.classList)
    if (evt.target.parentElement.classList.contains('add-contact')) {
        const input = ` <form action="/users/me/add-contact" method="POST">
                        <input type="text" name="contact">
                        <button type="submit" clsas="btn-black">Ustaw</button>
                    </form>`;
        evt.target.innerHTML = input;
    }
})