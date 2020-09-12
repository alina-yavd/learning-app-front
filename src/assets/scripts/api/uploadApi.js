function apiUploadWords() {
    let formData = new FormData(uploadForm);
    let url = serverUrl + 'upload';
    let request = new Request(url, {
        method: 'POST',
        body: formData
    });
    fetch(request)
        .then((resp) => resp.json())
        .then(function (data) {
            resultUploadWords(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
