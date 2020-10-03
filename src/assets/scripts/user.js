const profileForm = document.querySelector('#profile-form');
const registerForm = document.querySelector('#register-form');
const logoutLink = document.querySelectorAll('.logout-link');

document.addEventListener('DOMContentLoaded', function () {
    apiGetUser();

    if (!!profileForm) {
        profileForm.addEventListener('submit', function (event) {
            event.preventDefault();
            apiUpdateUser();
        })
    }

    if (!!registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            apiCreateUser();
        })
    }

    if (logoutLink.length) {
        logoutLink.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                apiLogoutUser();
            });
        });
    }
});

function redirectUserAuthorized() {
    if (window.location.pathname === '/auth/') {
        window.location.href = '/profile/';
    }
}

function redirectUserNotAuthorized() {
    if (window.location.pathname === '/profile/') {
        window.location.href = '/auth/';
    }
}

function resultGetUser(userData) {
    localData.set('user', userData);
}

function renderGetUser(data) {
    if (!profileForm) {
        return;
    }
    profileForm.querySelector('input[name="email"]').value = data.email;
    profileForm.querySelector('input[name="firstName"]').value = data.firstName;
    profileForm.querySelector('input[name="lastName"]').value = data.lastName;
}