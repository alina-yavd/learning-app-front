function apiUploadWords() {
    let formData = new FormData(uploadForm);
    let url = serverUrl + 'upload';
    let request = new Request(url, {
        method: 'POST',
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
                resultUploadWords(data);
            } else {
                location.reload();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
