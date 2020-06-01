const modal = document.querySelector(".add-post");
const btn = document.querySelector('#addPost')
const close = document.querySelector('.close');

btn.addEventListener('click', evt => {
    modal.style.display = "block";
})

close.addEventListener('click', evt => {
    modal.style.display = "none;"
})

window.addEventListener('click', () => {
    if(event.target === modal) modal.style.display = "none";
})