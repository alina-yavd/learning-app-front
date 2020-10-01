function apiGetUser() {
    if (!localData.forceget('accessToken') || !localData.forceget('refreshToken')) {
        redirectUserNotAuthorized();
        return false;
    }
    let url = serverUrl + 'user';
    fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + localData.forceget('accessToken'),
        }),
    })
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            console.log(data);
            if (!!data.message) {
                apiRefreshToken();
            } else {
                redirectUserAuthorized();
                renderGetUser(data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function apiCreateUser() {
    let formData = new FormData(registerForm);
    let url = serverUrl + 'auth/register';
    let request = new Request(url, {
        method: 'POST',
        body: formData
    });
    fetch(request)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            apiGenerateTokenResponse(data, 'access');
        })
        .catch(function (error) {
            console.log(error);
        });
}

function apiUpdateUser() {
    if (!localData.forceget('accessToken')) {
        alert('Not authorized!');
    }
    let formData = new FormData(profileForm);
    let url = serverUrl + 'user';
    let request = new Request(url, {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'Authorization': 'Bearer ' + localData.forceget('accessToken'),
        })
    });
    fetch(request)
        .then(function (resp){
            if (!resp.ok) {
                return resp.json()
            }
        })
        .then(function (data) {
            if (!!data) {
                alert(data.message);
            } else {
                location.reload();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}