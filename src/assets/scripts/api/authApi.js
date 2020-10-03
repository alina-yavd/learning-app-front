function apiGetToken() {
    let formData = new FormData(loginForm);
    let url = serverUrl + 'auth/token';
    let request = new Request(url, {
        method: 'POST',
        body: formData
    });
    apiGenerateToken(request, 'access');
}

function apiRefreshToken() {
    if (!localData.forceget('accessToken') || !localData.forceget('refreshToken')) {
        redirectUserNotAuthorized();
        return false;
    }
    let formData = new FormData;
    let url = serverUrl + 'auth/refresh';
    let request = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Basic ' + localData.forceget('refreshToken'),
        }),
        body: formData,
    });
    apiGenerateToken(request, 'refresh');
}

function apiGenerateToken(request, type) {
    fetch(request)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            apiGenerateTokenResponse(data, type);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function apiLogoutUser() {
    let url = serverUrl + 'auth/logout';
    fetch(url, {
        headers: getAuthHeader(),
    });
    localData.remove('accessToken');
    localData.remove('refreshToken');
    localData.remove('user');
    localData.remove('userGroups');
    redirectUserNotAuthorized();
    return false;
}

function apiGenerateTokenResponse(data, type) {
    console.log(data);
    if (!data.token) {
        let message = !!data.message ? data.message : 'Что-то пошло не так, пожалуйста перезагрузите страницу и попробуйте снова.'
        alert(message);
        if (type === 'refresh') {
            localData.remove('accessToken');
            localData.remove('refreshToken');
            redirectUserNotAuthorized();
            return false;
        }
    } else {
        storeToken(data);
        redirectUserAuthorized();
        if (type === 'refresh') {
            location.reload();
        }
    }
}