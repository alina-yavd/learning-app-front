function apiCreateLanguage() {
    let formData = new FormData(languageForm);
    let url = serverUrl + 'language/create';
    let request = new Request(url, {
        method: 'POST',
        headers: getAuthHeader(),
        body: formData
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

function apiGetLanguages() {
    let url = serverUrl + 'language';
    fetch(url, {
        headers: getAuthHeader(),
    })
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            resultGetLanguages(data.data);
            renderGetLanguages(data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}