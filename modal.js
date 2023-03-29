const myModal = document.getElementById('myModal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');

openModal.addEventListener('click', () => {
    myModal.showModal();
});

closeModal.addEventListener('click', () => {
    myModal.close();
});