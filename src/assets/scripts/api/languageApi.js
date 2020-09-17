function apiCreateLanguage() {
    let formData = new FormData(languageForm);
    let url = serverUrl + 'language/create';
    let request = new Request(url, {
        method: 'POST',
        body: formData
    });
    fetch(request)
        .then((resp) => resp.json())
        .then(function (data) {
            if (data.status === 'success') {
                location.reload();
            } else {
                alert(data.message);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function apiGetLanguages() {
    let url = serverUrl + 'language';
    fetch(url)
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