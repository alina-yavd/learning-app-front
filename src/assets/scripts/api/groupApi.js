function apiGetGroups(language, translation) {
    let url = serverUrl + 'group';
    if (!!language || !!translation) {
        url += '?language=' + language + '&translation=' + translation;
    }
    fetch(url, {
        headers: getAuthHeader(),
    })
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            resultGetGroups(data);
            renderGetGroups(data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function apiGetGroup(id) {
    if (!id || id < 1) {
        return;
    }
    let url = serverUrl + 'group/' + id;
    fetch(url, {
        headers: getAuthHeader(),
    })
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            renderGetGroup(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function apiDeleteGroup(id) {
    let url = serverUrl + 'group/' + id;
    let postData = new FormData;
    let fetchData = {
        method: 'DELETE',
        headers: new Headers(),
        body: postData
    }
    fetch(url, fetchData)
        .then(function (resp){
            if (!resp.ok) {
                return resp.json()
            }
        })
        .then(function (data) {
            if (!!data) {
                alert(data.message);
            } else {
                document.querySelector('.group[data-id="' + id + '"]').remove();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
