const loginForm = document.querySelector('#login-form');

document.addEventListener('DOMContentLoaded', function () {
    if (!!loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            apiGetToken();
        })
    }
});

function storeToken(data){
    localData.set('accessToken', data.token);
    localData.set('refreshToken', data.refresh_token);
}