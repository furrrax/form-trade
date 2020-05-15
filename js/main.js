const myForm = document.querySelector('.form');
const send = document.querySelector('.submit__button');
const error = document.querySelector('.error');
const errEmail = document.querySelector('.error-email');
const errPassword = document.querySelector('.error-password');
const errorReg = document.querySelector('.error--reg');

send.addEventListener('click', event => {
    event.preventDefault();

    if (validateForm(myForm)) {

        const formData = new FormData(myForm);

        formData.append('email', myForm.elements.email.value);
        formData.append('password', myForm.elements.password.value);
        formData.append('currencies', myForm.elements.currencies.value);


        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://your.site');
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send(formData);
        xhr.addEventListener('load', () => {
            
            //Очистка формы после отправки
            var formInputs = document.querySelectorAll('.form__input');
            for (var i = 0;  i < formInputs.length; i++) {
                formInputs[i].value = '';
            };

            //Проверка статуса отправки
            if(xhr.status >= 400) {
                console.log('При отправке произошла ошибка');
            } else {
                console.log('Данные отправлены');
            }
        });
    }
});

function validateForm(form) {
    var valid = true;

    if (!validateMail(form.elements.mail)) {
        valid = false;
    }
    if (!validatePassword(form.elements.password)) {
        valid = false;
    }
    
    return valid;
};

function validateMail(field) {
    if (!field.checkValidity()) {
        errEmail.textContent = field.validationMessage;
        errEmail.style.left = '50%';
        errorReg.style.display = 'block';
        send.style.marginTop = '16px';
        setTimeout(function(){
            errEmail.style.left = '9999px';
            errorReg.style.display = 'none';
            send.style.marginTop = '32px';
        },5000);
        return false;
    } else {
        field.previousElementSibling.textContent = '';
        error.style.left = '9999px';
        return true;
    }
};

function validatePassword(field) {
    if (!field.checkValidity()) {
        errPassword.textContent = field.validationMessage;
        errPassword.style.left = '50%';
        setTimeout(function(){
            errPassword.style.left = '9999px';
        },5000);
        return false;
    } else {
        field.previousElementSibling.textContent = '';
        error.style.left = '9999px';
        return true;
    }
};

const input = document.querySelector('.form__input');
const label = document.querySelector('.form__label');

input.addEventListener('keyup', function(e) {
    var length = this.value.length
    if (length >= 1) {
        label.style.top = '8px';
        label.style.fontSize = '12px';
    } else {
        label.style.top = '21px';
        label.style.fontSize = '16px';
    }
});