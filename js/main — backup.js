const myForm = document.querySelector('.form');
const send = document.querySelector('.submit__button');
const error = document.querySelector('.error');

send.addEventListener('click', event => {
    event.preventDefault();

    if (validateForm(myForm)) {
        console.log('Форма отправлена!');
    }
});

function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.mail)) {
        valid = false;
    }
    if (!validateField(form.elements.password)) {
        valid = false;
    }
    
    return valid;
};

function validateField(field) {
    if (!field.checkValidity()) {
        field.previousElementSibling.textContent = field.validationMessage;
        //error.style.left = '50%';
        /* setTimeout(function(){
            error.style.left = '9999px';
        },5000); */
        return false;
    } else {
        field.previousElementSibling.textContent = '';
        /* error.style.left = '-9999px'; */
        return true;
    }
};