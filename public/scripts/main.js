const myModal = new bootstrap.Modal(document.getElementById("modal"), {});
const buttonBackpagination = document.querySelector('.back')

document.onreadystatechange = function () {
  myModal.show();
};

buttonBackpagination.addEventListener('click', () => history.go(-2))