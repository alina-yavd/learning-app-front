function apiGetGroups(language, translation) {
    let url = serverUrl + 'group';
    if (!!language || !!translation) {
        url += '?language=' + language + '&translation=' + translation;
    }
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            resultGetGroups(data);
            renderGetGroups(data.items);
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
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            renderGetGroup(data.item);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function apiDeleteGroup(id) {
    let url = serverUrl + 'group/' + id;
    let postData = new FormData;
    let fetchData = {
        headers: new Headers(),
        method: 'DELETE',
        body: postData
    }
    fetch(url, fetchData)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            resultDeleteGroup(data, id);
        })
        .catch(function (error) {
            console.log(error);
        });
}
