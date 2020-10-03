function apiGetUserGroups() {
    if (!localData.forceget('accessToken') || !localData.forceget('refreshToken')) {
        redirectUserNotAuthorized();
        return false;
    }
    let url = serverUrl + 'user/group';
    fetch(url, {
        headers: getAuthHeader(),
    })
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            console.log(data);
            if (!!data.message) {
                console.log(data.message)
            } else {
                resultGetUserGroups(data);
                renderGetUserGroups(data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function apiAddUserGroup() {
    if (!localData.forceget('accessToken')) {
        alert('Not authorized!');
    }
    let formData = new FormData();
    let url = serverUrl + 'user/group/' + this.dataset.id;
    let request = new Request(url, {
        method: 'POST',
        headers: getAuthHeader(),
        body: formData,
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

function apiRemoveUserGroup() {
    if (!localData.forceget('accessToken')) {
        alert('Not authorized!');
    }
    let formData = new FormData();
    let url = serverUrl + 'user/group/' + this.dataset.id;
    let request = new Request(url, {
        method: 'DELETE',
        headers: getAuthHeader(),
        body: formData,
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